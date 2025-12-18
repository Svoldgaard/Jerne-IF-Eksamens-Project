using System.Security.Claims;
using Api.Models.Dtos.Requests;

namespace Api.Services;

public interface IAuthService
{
    Task<AuthUserInfoDto> AuthenticateAsync(LoginRequest request);
    Task<AuthUserInfoDto> RegisterAsync(RegisterRequest request);
    Task<AuthUserInfoDto?> GetUserInfoAsync(ClaimsPrincipal principal);
}