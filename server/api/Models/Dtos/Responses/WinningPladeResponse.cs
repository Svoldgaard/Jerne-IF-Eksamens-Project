namespace Api.Models.Dtos.Responses;

public class WinningPladeResponse
{
    public string PladeId { get; set; }
    public string Brugernavn { get; set; }
    public string TransaktionsNr { get; set; }
    public int Pris { get; set; }
    public bool Udbetalt { get; set; }
}