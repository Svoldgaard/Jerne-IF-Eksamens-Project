namespace api.Models.Dtos.Request;

public class UpdatePladeRequest
{
    public string PladeId {get; set;}
    public bool Gentag {get; set;}
    public bool Betalt {get; set;}
    
    public bool Udbetalt {get; set;}
}