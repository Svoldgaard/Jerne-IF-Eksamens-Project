using System.ComponentModel.DataAnnotations;

public class RegisterRequest
{
    [Required, EmailAddress]
    public string Email { get; set; } = null!;
    
    [Required]
    public string UserName { get; set; } = null!;
    
    [Required]
    public string FirstName { get; set; } = null!;
    
    [Required]
    public string LastName { get; set; } = null!;
    
    [Required, MinLength(6)]
    public string Password { get; set; } = null!;
    
    public int RoleId { get; set; } = 1;
}