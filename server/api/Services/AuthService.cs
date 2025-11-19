using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Api.Etc;
using api.Models.Dtos.Requests;
using Api.Models.Dtos.Responses;
using Api.Security;
using dataaccess.Entity;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Identity;

namespace Api.Services;

public interface IAuthService
{
    AuthUserInfo Authenticate(LoginRequest request);
    Task<AuthUserInfo> Register(RegisterRequest request);
    AuthUserInfo? GetUserInfo(ClaimsPrincipal principal);

}

public class AuthService(
    ILogger<AuthService> logger,
    IPasswordHasher<Login> passwordHasher,
    IRepository<Login> userRepository
        
) : IAuthService
{
    public AuthUserInfo Authenticate(LoginRequest request)
    {
        try
        {
            var user = userRepository.Query().Single(u => u.Email == request.Email);
            var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
            if (result == PasswordVerificationResult.Success)
            {
                return new AuthUserInfo(user.Id, user.UserName, user.Role);
            }
        }
        catch (Exception e)
        {
            logger.LogError(e.Message, e);
        }
        throw new AuthenticationError();
    }

    public Task<AuthUserInfo> Register(RegisterRequest request)
    {
        throw new NotImplementedException();
    }


    public AuthUserInfo? GetUserInfo(ClaimsPrincipal principal)
    {
        var userId = principal.GetUserId();
        return userRepository
            .Query()
            .Where(user => user.Id == userId)
            .SingleOrDefault()
            ?.ToDto();
    }
}