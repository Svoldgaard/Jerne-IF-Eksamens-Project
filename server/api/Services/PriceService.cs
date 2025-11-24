using Api.Models.Dtos.Responses;
using dataaccess.MyDbContext;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public class PriceService : IPriceService
{
    private readonly MyDbContext _context;

    public PriceService(MyDbContext context)
    {
        _context = context;
    }

    public async Task<List<PriceResponse>> GetAllPricesAsync()
    {
        var prices = await _context.Prices.ToListAsync();

        return prices.Select(p => new PriceResponse
        {
            Amount = p.Id,
            Price = p.Price
        }).ToList();
    }
}