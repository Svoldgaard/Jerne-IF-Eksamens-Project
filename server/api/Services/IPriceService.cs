using Api.Models.Dtos.Responses;

namespace Api.Services;

public interface IPriceService
{
    Task<List<PriceResponse>> GetAllPricesAsync();
}