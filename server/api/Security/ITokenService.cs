
namespace Api.Security;

public interface ITokenService
{
    string CreateToken(AuthUserInfoDto user);
}