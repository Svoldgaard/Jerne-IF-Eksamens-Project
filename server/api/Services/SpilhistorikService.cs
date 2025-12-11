using Api.Models.Dtos.Responses;
using dataaccess.MyDbContext;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public class SpilhistorikService(MyDbContext context) : ISpilhistorikService
{
    public async Task<List<PladeResponse>> GetSpilhistorikByUserIdAsync(int brugerId)
    {
        var plades = await context.Plades
            .Where(p => p.Brugerid == brugerId)
            .Include(p => p.Price)
            .Include(p => p.Ugetal)
            .ThenInclude(s => s.Vindersekvens)
            .OrderByDescending(p => p.Ugetal.Årstal)
            .ThenByDescending(p => p.Ugetal.Ugetal)
            .ToListAsync();
        
        return plades.Select(p =>
        {
            // Console.WriteLine($"Plade {p.Id} tal: {string.Join(",", p.Valgtetal ?? [])}");

            var winning = p.Ugetal!.Vindersekvens.FirstOrDefault()?.Vindertal ?? new List<int>();
            
            var isWinner = winning.Count > 0 && winning.All(n => p.Valgtetal.Contains(n));
            
            // Console.WriteLine($"WIN CHECK BACKEND: {p.Id}  chosen=[{string.Join(",", p.Valgtetal)}]  winning=[{string.Join(",", winning)}]  -> {isWinner}");
            
            return new PladeResponse
            {
                Id = p.Id,
                Uge = p.Ugetal.Ugetal ?? 0,
                Year = p.Ugetal.Årstal ?? DateTime.Now.Year,
                Gentag = p.Gentag,
                Pris = p.Price?.Price ?? 0,
                IsWinner = isWinner,
                Tal = p.Valgtetal ?? new List<int>(),
                Vindertal = winning
                // Vindertal = p.Ugetal!.Vindersekvens.FirstOrDefault()?.Vindertal ?? new List<int>()
            };
        }).ToList();
    }
    
    public async Task UpdateBoardWinnerStatusAsync(string pladeId)
    {
        var plade = await context.Plades
            .Include(p => p.Ugetal)
            .ThenInclude(u => u.Vindersekvens)
            .FirstOrDefaultAsync(p => p.Id == pladeId);

        if (plade == null || plade.Ugetal == null) return;

        var winningNumbers = plade.Ugetal.Vindersekvens.FirstOrDefault()?.Vindertal ?? new List<int>();
        if (winningNumbers.Count == 0) return;
        
        bool isWinner = winningNumbers.Count > 0 && winningNumbers.All(n => plade.Valgtetal.Contains(n));
        
        
        if (isWinner != plade.Iswinner)
        {
            plade.Iswinner = isWinner;
            context.Plades.Update(plade);
            await context.SaveChangesAsync();
        }
    }

    public async Task<List<SpilugeResponse>> GetAllSpilugeAsync()
    {
        var spiluger = await  context.Spiluges
            .Include(s => s.Vindersekvens)
            .OrderByDescending(s => s.Årstal)
            .ThenByDescending(s => s.Ugetal)
            .ToListAsync();
        
        return spiluger.Select(s => new SpilugeResponse
        {
            Uge = s.Ugetal ?? 0,
            Year = s.Årstal ?? 0,
            Vindertal = s.Vindersekvens.FirstOrDefault()?.Vindertal ?? new List<int>()
        }).ToList();
    }
}