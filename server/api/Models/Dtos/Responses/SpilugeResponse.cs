using dataaccess.Entity;

namespace Api.Models.Dtos.Responses;

public class SpilugeResponse
{
    public int Uge {get; set;}
    public int Year {get; set;}
    public List<int> Vindertal { get; set; } = new();
}