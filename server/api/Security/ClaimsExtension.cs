using System.Security.Claims;

namespace Api.Security;

public static class ClaimsExtension
{
    public static string GetUserId(this ClaimsPrincipal claims) =>
        claims.FindFirst(ClaimTypes.NameIdentifier)!.Value;
    
    public static IEnumerable<Claim> ToClaims(this AuthUserInfoDto user) => new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()), 
        new Claim(ClaimTypes.Role, user.RoleId.ToString())           
    };
    public static ClaimsPrincipal ToPrincipal(this AuthUserInfoDto user) =>
        new ClaimsPrincipal(new ClaimsIdentity(user.ToClaims(), "jwt"));
}