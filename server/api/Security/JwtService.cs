using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Api.Models.Dtos.Responses;
using Microsoft.IdentityModel.Tokens;

namespace Api.Security;

public class JwtService : ITokenService
{
    private readonly IConfiguration _config;
    private const string JwtKey = "JwtKey";
    private const string SignatureAlgorithm = SecurityAlgorithms.HmacSha512;

    public JwtService(IConfiguration config)
    {
        _config = config;
        
        var jwtKey = _config.GetValue<string>(JwtKey);
        if (string.IsNullOrWhiteSpace(jwtKey))
        {
            throw new InvalidOperationException(
                "JwtKey is missing. Configure it via environment variables or appsettings.Development.json"
            );
        }
    }

    public string CreateToken(AuthUserInfoDto user)
    {
        var keyBytes = Convert.FromBase64String(_config.GetValue<string>(JwtKey)!);
        var securityKey = new SymmetricSecurityKey(keyBytes);

        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(user.ToClaims()), 
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(securityKey, SignatureAlgorithm)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public static TokenValidationParameters ValidationParameters(IConfiguration config)
    {
        var key = Convert.FromBase64String(config.GetValue<string>(JwtKey)!);
        return new TokenValidationParameters
        {
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    }
}