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
            var user = userRepository.Query().Single(u => u.Brugernavn == request.Username);
            var result = passwordHasher.VerifyHashedPassword(user, user.Password, request.Password);
            if (result == PasswordVerificationResult.Success)
            {
                return new AuthUserInfo(user.Brugerid,user.Brugernavn, user.Rolleid);
            }
        }
        catch (Exception e)
        {
            logger.LogError(e.Message, e);
        }
        throw new AuthenticationError();
    }


    
}