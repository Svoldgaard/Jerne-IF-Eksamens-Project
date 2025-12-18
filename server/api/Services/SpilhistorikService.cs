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
            var winning = p.Ugetal!.Vindersekvens.FirstOrDefault()?.Vindertal ?? new List<int>();
            
            var isWinner = winning.Count > 0 && winning.All(n => p.Valgtetal.Contains(n));
            
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
    
    public async Task<List<AdminPladeResponse>> GetPladerForWeekAsync(int year, int week)
    {
        var spiluge = await context.Spiluges
            .Include(s => s.Vindersekvens)
            .FirstOrDefaultAsync(s => s.Ugetal == week && s.Årstal == year);

        if (spiluge == null)
            return new List<AdminPladeResponse>();

        var winningNumbers =
            spiluge.Vindersekvens.FirstOrDefault()?.Vindertal ?? new List<int>();

        var plades = await context.Plades
            .Where(p => p.Ugetalid == spiluge.Id)
            .Include(p => p.Bruger)
            .ThenInclude(b => b.Profils)
            .ToListAsync();

        return plades.Select(p =>
        {
            var isWinner =
                winningNumbers.Count > 0 &&
                p.Valgtetal != null &&
                winningNumbers.All(n => p.Valgtetal.Contains(n));

            return new AdminPladeResponse
            {
                PladeId = p.Id,
                Email = p.Bruger.Profils.FirstOrDefault()?.Email,
                Tal = p.Valgtetal ?? new List<int>(),
                TransaktionsNr = p.Id,
                IsWinner = isWinner
            };
        }).ToList();
    }
}