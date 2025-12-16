namespace Api.Models.Dtos.Responses;

public class PladeResponse
{
    public string Id {get; set;}
    public int Uge {get; set;}
    public int Year { get; set; } 
    public bool Gentag {get; set;}
    public int Pris {get; set;}
    public bool IsWinner {get; set;}
    public List<int> Tal {get; set;}
    public List<int> Vindertal {get; set;}
    public bool Betalt {get; set;}
    
}