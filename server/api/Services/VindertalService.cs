using System.Globalization;
using api.Models.Dtos;
using Api.Models.Dtos.Responses;
using dataaccess.Entity;
using dataaccess.MyDbContext;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public class VindertalService
{
    private readonly MyDbContext context;

    public VindertalService(MyDbContext context)
    {
        this.context = context;
    }
    public async Task<Vindersekven> CreateVindersekvens(CreateVindertalDTO dto)
    {
        try
        {
            var newSequence = new Vindersekven
            {
                Vindertal = dto.Vindertal,
                Spilugeid = dto.SpilugeID
            };

            context.Vindersekvens.Add(newSequence);
            await context.SaveChangesAsync();
            return newSequence;
        }
        catch (Exception ex)
        {
            Console.WriteLine("🔥 ERROR in CreateVindersekvens: " + ex.Message);
            Console.WriteLine(ex.StackTrace);
            throw;
        }
    }

    public async Task<bool> CheckWinningNumbers()
    {
        var currentCulture = CultureInfo.CurrentCulture;
        var weekNo = currentCulture.Calendar.GetWeekOfYear(
            DateTime.Now,
            currentCulture.DateTimeFormat.CalendarWeekRule,
            currentCulture.DateTimeFormat.FirstDayOfWeek);
        var year = DateTime.Now.Year;

        
        var spiluge = await context.Spiluges
            .Include(s => s.Vindersekvens)
            .FirstOrDefaultAsync(s => s.Ugetal == weekNo && s.Årstal == year);
        
        
        if (spiluge == null) return false;
        
        return spiluge.Vindersekvens != null && spiluge.Vindersekvens.Any();
    }
    
    public async Task CalculateAndMarkWinnersAsync(int spilugeId)
    {
        
        var spiluge = await context.Spiluges
        .Include(s => s.Vindersekvens)
        .FirstOrDefaultAsync(s => s.Id == spilugeId);
        
        if (spiluge == null) throw new Exception("Spiluge not found");
        
        var winningNumbers = spiluge.Vindersekvens.FirstOrDefault()?.Vindertal;

        if (winningNumbers == null || winningNumbers.Count == 0)
        {
            throw new Exception("No winning numbers found for the specified spiluge.");
        }
        
        var platesInWeek = await context.Plades
            .Where(p => p.Ugetalid == spilugeId)
            .ToListAsync();
        
        bool anyChanges = false;

        foreach (var plade in platesInWeek)
        {
            bool isWinner = winningNumbers.All(winNum => plade.Valgtetal.Contains(winNum));

            if (plade.Iswinner != isWinner)
            {
                plade.Iswinner = isWinner;
                
                context.Plades.Update(plade);
                
                anyChanges = true;
            }
        }
        if (anyChanges)
        {
            await context.SaveChangesAsync();
        }
    }

}