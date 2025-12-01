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

        var newPlade = new Plade
        {
            Id = Guid.NewGuid().ToString(),

            Brugerid = request.UserId,
            Priceid = request.PriceId,
            Ugetal = weekNo,
            Gentag = request.Repeat,
            
        };

        context.Plades.Add(newPlade);
        foreach (var number in request.SelectedNumbers )
        {
            var talRow = new Pladetal
            {
                
                Tal = number
            };
            
            newPlade.Pladetals.Add(talRow);

        }
        context.Plades.Add(newPlade);
        
        await context.SaveChangesAsync();

        return newPlade;


    }

    public async Task<List<PladeResponse>> GetPladesByUserIdAsync(int userId)
    {
        var plades = await context.Plades
            .Where(p => p.Brugerid == userId)
            .Include(p => p.Pladetals)
            .Include(p => p.Price)
            .OrderByDescending(p => p.Ugetal)
            .ToListAsync();
        
        return plades.Select(p => new PladeResponse
        {
            Id = p.Id,
            Uge = p.Ugetal,
            Gentag = p.Gentag,
            Pris = p.Price?.Price ?? 0,
            Tal = p.Pladetals.Select(t => t.Tal).OrderBy(t => t).ToList()
        }).ToList();
    }
}