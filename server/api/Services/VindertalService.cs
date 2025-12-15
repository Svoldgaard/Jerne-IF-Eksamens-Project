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

}