namespace api.Models.Dtos.Request;

public class PladeRequest
{
    public List<int> SelectedNumbers { get; set; }
    public int PriceId { get; set; }
    public int UserId {get; set;}
    public bool Repeat {get; set;}
}