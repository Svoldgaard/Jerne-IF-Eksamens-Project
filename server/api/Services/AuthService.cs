using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Api.Etc;
using Api.Mappers;
using Api.Models.Dtos.Requests;
using Api.Models.Dtos.Responses;
using dataaccess.Entity;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Identity;

namespace Api.Services;

public class AuthService : IAuthService
{
    private readonly ILogger<AuthService> _logger;
    private readonly IPasswordHasher<Login> _passwordHasher;
    private readonly IRepository<Login> _loginRepository;
    private readonly IRepository<Profil> _profileRepository;

    public AuthService(
        ILogger<AuthService> logger,
        IPasswordHasher<Login> passwordHasher,
        IRepository<Login> loginRepository,
        IRepository<Profil> profileRepository)
    {
        _logger = logger;
        _passwordHasher = passwordHasher;
        _loginRepository = loginRepository;
        _profileRepository = profileRepository;
    }

    public async Task<AuthUserInfoDto> AuthenticateAsync(LoginRequest request)
    {
        try
        {
            var profile = _profileRepository.Query().SingleOrDefault(p => p.Email == request.Username);
            if (profile == null) throw new AuthenticationError();

            var login = _loginRepository.Query().SingleOrDefault(l => l.Brugerid == profile.Brugerid);
            if (login == null) throw new AuthenticationError();

            var result = _passwordHasher.VerifyHashedPassword(login, login.Password, request.Password);
            if (result != PasswordVerificationResult.Success) throw new AuthenticationError();

            return login.ToDto(profile);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Authenticate error");
            throw new AuthenticationError();
        }
    }

    public async Task<AuthUserInfoDto> RegisterAsync(RegisterRequest request)
    {
        if (_profileRepository.Query().Any(p => p.Email == request.Email))
            throw new ValidationException("Email already exists.");

        var login = new Login
        {
            Brugernavn = request.UserName,
            Rolleid = request.RoleId
        };
        login.Password = _passwordHasher.HashPassword(login, request.Password);
        await _loginRepository.Add(login);

        var profile = new Profil
        {
            Brugerid = login.Brugerid,
            Email = request.Email,
            Fnavn = request.FirstName,
            Lnavn = request.LastName,
            Aktiv = true
        };
        await _profileRepository.Add(profile);

        return login.ToDto(profile);
    }

    public async Task<AuthUserInfoDto?> GetUserInfoAsync(ClaimsPrincipal principal)
    {
        var idClaim = principal.Claims.FirstOrDefault(c => c.Type == "sub");
        if (idClaim == null || !int.TryParse(idClaim.Value, out int userId)) return null;

        var login = _loginRepository.Query().SingleOrDefault(l => l.Brugerid == userId);
        if (login == null) return null;

        var profile = _profileRepository.Query().SingleOrDefault(p => p.Brugerid == userId);
        return login.ToDto(profile);
    }
}
