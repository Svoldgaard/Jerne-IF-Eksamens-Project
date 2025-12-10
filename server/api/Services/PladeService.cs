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

        if (spiluge == null || spiluge.Status == false)
        {
            throw new InvalidOperationException($"Spillet for uge {weekNo} er lukket. Du kan ikke købe plader lige nu.");
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
        //await UpdateBoardWinnerStatusAsync(newPladeId);
        return newPlade;
    }

    public async Task<List<PladeResponse>> GetPladesByUserIdAsync(int userId)
    {
        var currentCulture = CultureInfo.CurrentCulture;
        var weekNo = currentCulture.Calendar.GetWeekOfYear(
            DateTime.Now,
            currentCulture.DateTimeFormat.CalendarWeekRule,
            currentCulture.DateTimeFormat.FirstDayOfWeek);
        var year = DateTime.Now.Year;
        
        var activeSpiluge = await context.Spiluges
            .FirstOrDefaultAsync(s => s.Ugetal == weekNo && s.Årstal == year);

        if (activeSpiluge == null)
        {
            return new List<PladeResponse>();
        }
        
        
        var plades = await context.Plades
            .Where(p => p.Brugerid == userId)
            .Where(p => p.Ugetalid == activeSpiluge.Id)
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
    
    /// <summary>
    /// Two methods below is for checkboxes
    /// </summary>
    /// <param name="pladeId"></param>
    /// <param name="newStatus"></param>
    
    public async Task UpdateGentagStatusAsync(string pladeId, bool newStatus)
    {
        var updatePlade = new Plade
        {
            Id = pladeId,
            Gentag = newStatus
        };
         context.Plades.Attach(updatePlade);
         context.Entry(updatePlade).Property(p => p.Gentag).IsModified = true;
         
         await context.SaveChangesAsync();

         context.Entry(updatePlade).State = EntityState.Detached;
         
    }

    public async Task UpdateBetaltStatusAsync(string pladeId, bool newStatus)
    {
        var updateStatusBetalt = new Plade
        {
            Id = pladeId,
            Status = newStatus
        };
        context.Plades.Attach(updateStatusBetalt);
        context.Entry(updateStatusBetalt).Property(p => p.Status).IsModified = true;
        
        await context.SaveChangesAsync();
        
        context.Entry(updateStatusBetalt).State = EntityState.Detached;

    }

  
    /// /// /// /// ///
       
    
    
    public async Task<List<AdminPladeResponse>> GetAllActivePladesAsync()
    {
        var currentCulture = CultureInfo.CurrentCulture;
        var weekNo = currentCulture.Calendar.GetWeekOfYear(
            DateTime.Now,
            currentCulture.DateTimeFormat.CalendarWeekRule,
            currentCulture.DateTimeFormat.FirstDayOfWeek);
        var year =  DateTime.Now.Year;

        var activeSpiluge = await context.Spiluges
            .FirstOrDefaultAsync(s => s.Ugetal == weekNo && s.Årstal == year);

        if (activeSpiluge == null) return new List<AdminPladeResponse>();
        
        var plades = await context.Plades
            .Where(p => p.Ugetalid == activeSpiluge.Id)
            .Include(p => p.Bruger)
            .Include(p => p.Price)
            .ToListAsync();
        
        return plades.Select(p => new AdminPladeResponse
        {
            PladeId = p.Id,
            Brugernavn = p.Bruger.Brugernavn,
            TransaktionsNr = p.Id,
            Pris = p.Price?.Price ?? 0,
            Betalt = p.Status
        }).ToList();
    }
    
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
    
    public async Task CloseCurrenWeekAsync()
    {
        var currentCulture = CultureInfo.CurrentCulture;
        var weekNo = currentCulture.Calendar.GetWeekOfYear(
            DateTime.Now,
            currentCulture.DateTimeFormat.CalendarWeekRule,
            currentCulture.DateTimeFormat.FirstDayOfWeek);
        var year = DateTime.Now.Year;
        
        var activeSpiluge = await context.Spiluges
            .FirstOrDefaultAsync(s => s.Ugetal == weekNo && s.Årstal == year);

        if (activeSpiluge == null)
        {
            throw new InvalidOperationException($"No active spiluge found for week {weekNo}, {year}.");
        }

        activeSpiluge.Status = false;
        
        context.Spiluges.Update(activeSpiluge);
        
        await context.SaveChangesAsync();
    }

    public async Task StartNewWeekAsync()
    {
        var currentCulture = CultureInfo.CurrentCulture;
        var weekNo = currentCulture.Calendar.GetWeekOfYear(
            DateTime.Now,
            currentCulture.DateTimeFormat.CalendarWeekRule,
            currentCulture.DateTimeFormat.FirstDayOfWeek);
        // var fakeFutureDate = DateTime.Now.AddDays(7); 
        // var weekNo = currentCulture.Calendar.GetWeekOfYear(
        //     fakeFutureDate,
        //     currentCulture.DateTimeFormat.CalendarWeekRule,
        //     currentCulture.DateTimeFormat.FirstDayOfWeek);
        var year = DateTime.Now.Year;
        
        var currentSpiluge = await context.Spiluges
            .FirstOrDefaultAsync(s => s.Ugetal == weekNo && s.Årstal == year);

        if (currentSpiluge != null)
        {
            currentSpiluge.Status = true;
            context.Spiluges.Update(currentSpiluge);
        }
        else
        {
            var newSpiluge = new Spiluge
            {
                Ugetal = weekNo,
                Årstal = year,
                Status = true
            };
            context.Spiluges.Add(newSpiluge);
        }
        await context.SaveChangesAsync();
    }

    public async Task<WeekStatusResponse> GetWeekStatusAsync()
    {
        var currentCulture = CultureInfo.CurrentCulture;
        var weekNo = currentCulture.Calendar.GetWeekOfYear(
            DateTime.Now,
            currentCulture.DateTimeFormat.CalendarWeekRule,
            currentCulture.DateTimeFormat.FirstDayOfWeek);
        var year = DateTime.Now.Year;

        
        var spiluge = await context.Spiluges
            .FirstOrDefaultAsync(s => s.Ugetal == weekNo && s.Årstal == year);

        return new WeekStatusResponse
        {
            IsOpen = spiluge?.Status ?? false,
            Week = weekNo,
            Year = year
        };
    }
}