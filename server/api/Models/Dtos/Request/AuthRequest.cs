using System.ComponentModel.DataAnnotations;

namespace api.Models.Dtos.Requests;

public record RegisterRequest(
    [Required][EmailAddress] string Email,
    [Required] string UserName,
    [MinLength(6)] string Password,
    [Required] string Name
);

public record LoginRequest([Required] string Username, [Required] string Password);