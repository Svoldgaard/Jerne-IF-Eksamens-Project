namespace Api.Models.Dtos.Responses;

public record LoginResponse(string Jwt, AuthUserInfoDto User);