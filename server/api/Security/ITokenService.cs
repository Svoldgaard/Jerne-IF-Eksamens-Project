using Api.Models.Dtos.Responses;

namespace Api.Security;

public interface ITokenService
{
    string CreateToken(AuthUserInfoDto user);
}