using System.Globalization;
using api.Models.Dtos.Request;
using Api.Models.Dtos.Responses;
using dataaccess.Entity;
using dataaccess.MyDbContext;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public class PladeService(MyDbContext context) : IPladeService
{
    public async Task<Plade> CreatePladeAsync(PladeRequest request)
    {

        var newPladeId = Guid.NewGuid().ToString();
        
        var currentCulture = CultureInfo.CurrentCulture;
        var weekNo = currentCulture.Calendar.GetWeekOfYear(
            DateTime.Now,
            currentCulture.DateTimeFormat.CalendarWeekRule,
            currentCulture.DateTimeFormat.FirstDayOfWeek);
        var year = DateTime.Now.Year;
        
        var spiluge = await context.Spiluges
            .FirstOrDefaultAsync(s => s.Ugetal == weekNo && s.Årstal == year);

        if (spiluge == null)
        {
            spiluge = new Spiluge
            {
                Ugetal = weekNo,
                Årstal = year,
                Status = true
            };
            context.Spiluges.Add(spiluge);
            await context.SaveChangesAsync();
        }

        var newPlade = new Plade
        {
            Id = newPladeId,
            Brugerid = request.UserId,
            Priceid = request.PriceId,
            Ugetalid = spiluge.Id,
            Gentag = request.Repeat,
            Valgtetal = request.SelectedNumbers,
            Iswinner = false,
            Status = true
            
        };

        context.Plades.Add(newPlade);
        await context.SaveChangesAsync();

        return newPlade;


    }

    public async Task<List<PladeResponse>> GetPladesByUserIdAsync(int userId)
    {
        var plades = await context.Plades
            .Where(p => p.Brugerid == userId)
            
            .Include(p => p.Price)
            .Include(p => p.Ugetal)
            .OrderByDescending(p => p.Ugetal.Ugetal)
            .ToListAsync();
        
        return plades.Select(p => new PladeResponse
        {
            Id = p.Id,
            Uge = p.Ugetal.Ugetal ?? 0,
            Gentag = p.Gentag,
            Pris = p.Price?.Price ?? 0,
            Tal = p.Valgtetal ?? new List<int>()
        }).ToList();
    }

    public async Task<List<PladeResponse>> GetSpilhistorikByUserIdAsync(int brugerId)
    {
        var plades = await context.Plades
            .Where(p => p.Brugerid == brugerId)
            
            .Include(p => p.Price)
            .OrderByDescending(p => p.Ugetal.Ugetal)
            .ToListAsync();

        return plades.Select(p => new PladeResponse
        {
            Id = p.Id,
            Uge = p.Ugetalid,
            Gentag = p.Gentag,
            Pris = p.Price?.Price ?? 0,
            IsWinner = p.Iswinner,
            Tal = p.Valgtetal ?? new List<int>()
        }).ToList();
    }
    
}