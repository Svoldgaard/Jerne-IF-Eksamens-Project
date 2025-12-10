namespace api.Controllers;

public class ProfilDto
{
    public string Fnavn { get; set; } = null!;

    public string Lnavn { get; set; } = null!;

    public string Email { get; set; } = null!;
    
    public bool Aktiv { get; set; }
}