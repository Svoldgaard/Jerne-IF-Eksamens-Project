// Api/Controllers/AuthController.cs

using System.Text.Json;
using Api.Etc;
using Api.Models.Dtos.Requests;
using Api.Models.Dtos.Responses;
using Api.Security;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ITokenService _tokenService;

    public AuthController(IAuthService authService, ITokenService tokenService)
    {
        _authService = authService;
        _tokenService = tokenService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        try
        {
            var userInfo = await _authService.AuthenticateAsync(request);
            var token = _tokenService.CreateToken(userInfo);
            var response = new LoginResponse(token, userInfo);

            Console.WriteLine("=== LOGIN RESPONSE SENT TO FRONTEND ===");
            Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(
                response,
                new JsonSerializerOptions { WriteIndented = true }
            ));
            return Ok(new LoginResponse(token, userInfo));
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = "Login failed", detail = ex.Message });
        }
    }
    
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<RegisterResponse>> Register([FromBody] RegisterRequest request)
    {
        var userInfo = await _authService.RegisterAsync(request);
        return Ok(new RegisterResponse(userInfo.UserId, userInfo.UserName, userInfo.Email));
    }



    [HttpPost("logout")]
    public IActionResult Logout()
    {
        return NoContent();
    }

    [HttpGet("userinfo")]
    public async Task<ActionResult<AuthUserInfoDto?>> UserInfo()
    {
        var user = await _authService.GetUserInfoAsync(User);
        if (user == null) return NotFound();
        return Ok(user);
    }
}