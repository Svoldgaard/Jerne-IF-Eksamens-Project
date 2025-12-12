namespace Api.Models.Dtos.Responses;

public class AdminPladeResponse
{
    public string PladeId {get; set;}
    public string Brugernavn {get; set;}
    public string TransaktionsNr {get; set;}
    public int Pris {get; set;}
    
    public bool Betalt {get; set;}
    
    public List<int> Tal {get; set;}
    public string Email {get; set;}
    
}