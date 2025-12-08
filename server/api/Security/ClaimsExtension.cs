using System.Security.Claims;
using Api.Models.Dtos.Responses;

namespace Api.Security;

public static class ClaimsExtension
{
    // Get the user ID from a ClaimsPrincipal
    public static string GetUserId(this ClaimsPrincipal claims) =>
        claims.FindFirst(ClaimTypes.NameIdentifier)!.Value;

    // Convert AuthUserInfoDto to a list of Claims
    public static IEnumerable<Claim> ToClaims(this AuthUserInfoDto user) => new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()), // standard NameIdentifier claim
        new Claim(ClaimTypes.Role, user.RoleId.ToString())            // role claim
    };

    // Convert AuthUserInfoDto to ClaimsPrincipal
    public static ClaimsPrincipal ToPrincipal(this AuthUserInfoDto user) =>
        new ClaimsPrincipal(new ClaimsIdentity(user.ToClaims(), "jwt"));
}