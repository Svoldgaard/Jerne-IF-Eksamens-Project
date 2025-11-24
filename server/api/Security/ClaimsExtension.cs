using System.Security.Claims;
using Api.Models.Dtos.Responses;


namespace Api.Security;

public static class ClaimsExtension
{
    public static string GetUserId(this ClaimsPrincipal claims) =>
        claims.FindFirst(ClaimTypes.NameIdentifier)!.Value;

    public static IEnumerable<Claim> ToClaims(this AuthUserInfoDto user) => 
        [new("sub", user.UserId.ToString()), new("role", user.RoleId.ToString())];

    public static ClaimsPrincipal ToPrincipal(this AuthUserInfoDto user) =>
        new ClaimsPrincipal(new ClaimsIdentity(user.ToClaims()));
}