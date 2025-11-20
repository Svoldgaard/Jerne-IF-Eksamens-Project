using api.Models.Dtos.Requests;
using Api.Models.Dtos.Responses;
using Api.Security;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService service, ITokenService tokenService) : ControllerBase
{
    
    [HttpPost]
    [Route("login")]
    [AllowAnonymous]
    public LoginResponse Login([FromBody] LoginRequest request)
    {
        var userInfo = service.Authenticate(request);
        var token =  tokenService.CreateToken(userInfo);
        return new LoginResponse(token);
    }
    
    [HttpPost]
    [Route("logout")]
    public Task<IResult> Logout()
    {
        throw new NotImplementedException();
    }

    
}