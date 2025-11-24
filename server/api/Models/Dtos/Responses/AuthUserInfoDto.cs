namespace Api.Models.Dtos.Responses;

public record AuthUserInfoDto(
    int UserId,
    string UserName,
    string Email,
    string FirstName,
    string LastName,
    int RoleId
);