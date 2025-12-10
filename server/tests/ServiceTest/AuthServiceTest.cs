using Api.Etc;
using Api.Models.Dtos.Requests;
using Api.Services;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Moq;
using dataaccess.Entity;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

public class AuthServiceTest
{
    private readonly Mock<ILogger<AuthService>> _logger = new();
    private readonly Mock<IPasswordHasher<Login>> _passwordHasher = new();
    private readonly Mock<IRepository<Login>> _loginRepo = new();
    private readonly Mock<IRepository<Profil>> _profileRepo = new();

    private AuthService CreateService() => 
        new AuthService(_logger.Object, _passwordHasher.Object, _loginRepo.Object, _profileRepo.Object);
    
    
    [Fact]
    public async Task AuthenticateAsync_HappyPath_ReturnsUserDto()
    {
        // Arrange
        var login = new Login { Brugerid = 1, Password = "hashed" };
        var profile = new Profil { Brugerid = 1, Email = "user@test.com" };

        _profileRepo.Setup(r => r.Query()).Returns(new[] { profile }.AsQueryable());
        _loginRepo.Setup(r => r.Query()).Returns(new[] { login }.AsQueryable());
        _passwordHasher
            .Setup(h => h.VerifyHashedPassword(It.IsAny<Login>(), It.IsAny<string>(), "1234"))
            .Returns(PasswordVerificationResult.Success);

        var service = CreateService();

        var request = new LoginRequest("user@test.com", "1234");   // ✅ must match profile.Email

        // Act
        var result = await service.AuthenticateAsync(request);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(1, result.UserId);
        Assert.Equal("user@test.com", result.Email);
    }


    [Fact]
    public async Task AuthenticateAsync_UnhappyPath_InvalidPassword_ThrowsError()
    {
        // Arrange
        var login = new Login { Brugerid = 1, Password = "hashed" };
        var profile = new Profil { Brugerid = 1, Email = "user@test.com" };

        _profileRepo.Setup(r => r.Query()).Returns(new[] { profile }.AsQueryable());
        _loginRepo.Setup(r => r.Query()).Returns(new[] { login }.AsQueryable());
        _passwordHasher.Setup(h => h.VerifyHashedPassword(login, "hashed", "wrong"))
                       .Returns(PasswordVerificationResult.Failed);

        var service = CreateService();

        // Act + Assert
        await Assert.ThrowsAsync<AuthenticationError>(() =>
            service.AuthenticateAsync(
                new LoginRequest("user@test.com", "wrong")
            )
        );
    }

    [Fact]
    public async Task RegisterAsync_HappyPath_CreatesUser()
    {
        // Arrange
        _profileRepo.Setup(r => r.Query()).Returns(Enumerable.Empty<Profil>().AsQueryable());
        _loginRepo.Setup(r => r.Query()).Returns(Enumerable.Empty<Login>().AsQueryable());

        var service = CreateService();

        var request = new RegisterRequest
        {
            Email = "new@test.com",
            UserName = "newuser",
            Password = "pwd",
            FirstName = "John",
            LastName = "Doe"
        };

        // Act
        var result = await service.RegisterAsync(request);

        // Assert
        _loginRepo.Verify(r => r.Add(It.IsAny<Login>()), Times.Once);
        _profileRepo.Verify(r => r.Add(It.IsAny<Profil>()), Times.Once);
        Assert.Equal("new@test.com", result.Email);
        Assert.Equal("newuser", result.UserName);
    }

    [Fact]
    public async Task RegisterAsync_UnhappyPath_EmailAlreadyExists_ThrowsValidation()
    {
        // Arrange
        var existing = new Profil { Email = "exist@test.com" };

        _profileRepo.Setup(r => r.Query())
            .Returns(new[] { existing }.AsQueryable());

        var service = CreateService();

        // Act + Assert
        await Assert.ThrowsAsync<ValidationException>(() =>
            service.RegisterAsync(
                new RegisterRequest { Email = "exist@test.com", UserName = "abc" }
            )
        );
    }

    

    [Fact]
    public async Task GetUserInfoAsync_HappyPath_ReturnsInfo()
    {
        // Arrange
        var login = new Login { Brugerid = 7 };
        var profile = new Profil { Brugerid = 7, Email = "test@test.com" };

        _loginRepo.Setup(r => r.Query()).Returns(new[] { login }.AsQueryable());
        _profileRepo.Setup(r => r.Query()).Returns(new[] { profile }.AsQueryable());

        var service = CreateService();

        var principal = new ClaimsPrincipal(
            new ClaimsIdentity(new[] { new Claim("sub", "7") })
        );

        // Act
        var result = await service.GetUserInfoAsync(principal);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(7, result.UserId);
        Assert.Equal("test@test.com", result.Email);
    }

    [Fact]
    public async Task GetUserInfoAsync_UnhappyPath_NoClaim_ReturnsNull()
    {
        // Arrange
        var service = CreateService();
        var principal = new ClaimsPrincipal(); 

        // Act
        var result = await service.GetUserInfoAsync(principal);

        // Assert
        Assert.Null(result);
    }
}