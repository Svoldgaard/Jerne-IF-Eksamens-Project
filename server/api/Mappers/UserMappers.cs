using Api.Models.Dtos.Responses;
using dataaccess.Entity;

namespace Api.Mappers;

public static class UserMappers
{
    public static AuthUserInfoDto ToDto(this Login login, Profil profile)
    {
        return new AuthUserInfoDto(
            UserId: login.Brugerid,
            UserName: login.Brugernavn,
            Email: profile?.Email ?? string.Empty,
            FirstName: profile?.Fnavn ?? string.Empty,
            LastName: profile?.Lnavn ?? string.Empty,
            RoleId: login.Rolleid
        );
    }
}