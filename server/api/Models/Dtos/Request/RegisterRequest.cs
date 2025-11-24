using System.ComponentModel.DataAnnotations;

namespace Api.Models.Dtos.Requests;

public record RegisterRequest(
    [Required][EmailAddress] string Email,
    [Required] string UserName,
    [Required] string FirstName,
    [Required] string LastName,
    [Required][MinLength(6)] string Password,
    int RoleId = 0
);