using System.Globalization;
using api.Models.Dtos.Request;
using Api.Services;
using dataaccess.Entity;
using dataaccess.MyDbContext;
using Microsoft.EntityFrameworkCore;

namespace tests.ServiceTest;

public class PladeServiceTest
{
    private MyDbContext MemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        
        return new MyDbContext(options);
    }

    [Fact]
    public async Task CreatePladeAsyncTest()
    {
        using var context = MemoryDbContext();
        var today = DateTime.Now;
        var culture = CultureInfo.CurrentCulture;
        var weekNo = culture.Calendar.GetWeekOfYear(today, culture.DateTimeFormat.CalendarWeekRule, culture.DateTimeFormat.FirstDayOfWeek);

        var spiluge = new Spiluge { Id = 1, Ugetal = weekNo, Årstal = today.Year, Status = true };
        context.Spiluges.Add(spiluge);
        await context.SaveChangesAsync();
        
        var service = new PladeService(context);
        var request = new PladeRequest
        {
            UserId = 10,
            PriceId = 1,
            Repeat = true,
            SelectedNumbers = new List<int> { 1, 2, 3 }
        };
        
        var result = await service.CreatePladeAsync(request);
        
        Assert.NotNull(result);
        Assert.Equal(10, result.Brugerid);
        Assert.False(result.Status);
        
        var dbPlade = await context.Plades.FindAsync(result.Id);
        Assert.NotNull(dbPlade);
    }

    [Fact]
    public async Task GetPladeAsyncTest_ShouldReturnUsersPlader()
    {
        using var context = MemoryDbContext();
        var today = DateTime.Now;
        var culture = CultureInfo.CurrentCulture;
        var weekNo = culture.Calendar.GetWeekOfYear(today, culture.DateTimeFormat.CalendarWeekRule, culture.DateTimeFormat.FirstDayOfWeek);

        var avtiveWeek = new Spiluge {Id = 10, Ugetal = weekNo, Årstal = today.Year, Status = true};
        
        var userPlade = new Plade {Id = "p1", Brugerid = 1, Ugetalid = 10, Status = true, Valgtetal = new List<int> { 1, 2, 3 }};
        var otherUserPlade = new Plade { Id = "p2", Brugerid = 2, Ugetalid = 10, Status = true };
        
        context.Spiluges.Add(avtiveWeek);
        context.Plades.AddRange(userPlade, otherUserPlade);
        await context.SaveChangesAsync();
        
        var service = new PladeService(context);

        var result = await service.GetPladesByUserIdAsync(1);
        
        Assert.Single(result);
        Assert.Equal("p1", result[0].Id);
        Assert.True(result[0].Betalt);
    }

    [Fact]
    public async Task UpdateBetaltStatusASyncTest_ShouldUpdateBetaltStatus()
    {
        using var context = MemoryDbContext();
        var plade = new Plade { Id = "test-id", Status = false };
        context.Plades.Add(plade);
        await context.SaveChangesAsync();
        context.ChangeTracker.Clear();

        var service = new PladeService(context);
        
        await service.UpdateBetaltStatusAsync("test-id", true);
        
        var dbPlade = await context.Plades.FindAsync("test-id");
        Assert.True(dbPlade.Status);
    }

    [Fact]
    public async Task UpdateGentageStatusAsyncTest()
    {
        using var context = MemoryDbContext();
        var plade = new Plade { Id = "test-id", Gentag = false };
        context.Plades.Add(plade);
        await context.SaveChangesAsync();
        context.ChangeTracker.Clear();
        
        var service = new PladeService(context);
        
        await service.UpdateGentagStatusAsync("test-id", true);
        
        var dbPlade = await context.Plades.FindAsync("test-id");
        Assert.True(dbPlade.Gentag);

    }
    
    [Fact]
    public async Task UpdateUdbetaltStatusAsyncTest()
    {
        using var context = MemoryDbContext();
        var plade = new Plade { Id = "test-id", Udbetalt = false };
        context.Plades.Add(plade);
        await context.SaveChangesAsync();
        context.ChangeTracker.Clear();
        
        var service = new PladeService(context);
        
        await service.UpdateUdbetaltStatusasync("test-id", true);
        
        var dbPlade = await context.Plades.FindAsync("test-id");
        Assert.True(dbPlade.Udbetalt);

    }

    [Fact]
    public async Task CloseCurrentWeekAsyncTest()
    {
        using var context = MemoryDbContext();
        var today = DateTime.Now;
        var culture = CultureInfo.CurrentCulture;
        var weekNo = culture.Calendar.GetWeekOfYear(today, culture.DateTimeFormat.CalendarWeekRule, culture.DateTimeFormat.FirstDayOfWeek);

        var activeWeek = new Spiluge { Id = 10, Ugetal = weekNo, Årstal = today.Year, Status = true };
        context.Spiluges.Add(activeWeek);
        await context.SaveChangesAsync();
        
        var service = new PladeService(context);

        await service.CloseCurrenWeekAsync();
        
        var dbWeek = await context.Spiluges.FindAsync(10);
        Assert.False(dbWeek.Status);
    }

    [Fact]
    public async Task GetWeekStatusAsyncTest_ShouldReturnCorrectStatus()
    {
        using var context = MemoryDbContext();
        var today = DateTime.Now;
        var culture = CultureInfo.CurrentCulture;
        var weekNo = culture.Calendar.GetWeekOfYear(today, culture.DateTimeFormat.CalendarWeekRule, culture.DateTimeFormat.FirstDayOfWeek);

        context.Spiluges.Add(new Spiluge { Id = 10, Ugetal = weekNo, Årstal = today.Year, Status = true });
        await context.SaveChangesAsync();
        
        var service = new PladeService(context);
        
        var result =  await service.GetWeekStatusAsync();
        
        Assert.True(result.IsOpen);
        Assert.Equal(weekNo, result.Week);
        Assert.Equal(today.Year, result.Year);
    }

    [Fact]
    public async Task GetAllActivePladesAsyncTest_ReturnsPladesInCurrentWeek()
    {
        using var context = MemoryDbContext();
        var today = DateTime.Now;
        var culture = CultureInfo.CurrentCulture;
        var weekNo = culture.Calendar.GetWeekOfYear(today, culture.DateTimeFormat.CalendarWeekRule, culture.DateTimeFormat.FirstDayOfWeek);

        var currentWeek = new Spiluge { Id = 10, Ugetal = weekNo, Årstal = today.Year};
        var oldWeek = new Spiluge { Id = 9, Ugetal = weekNo -1, Årstal = today.Year};

        var user = new Login { Brugerid = 1, Brugernavn = "TestUser", Password = "TestUser" };
        
        var p1 = new Plade {Id = "p1", Ugetalid = 10, Brugerid = 1, Status = true};
        var p2 = new Plade {Id = "p2", Ugetalid = 10, Brugerid = 1, Status = false};
        var pOld = new Plade {Id = "pOld", Ugetalid = 9, Brugerid = 1};

        context.Logins.Add(user);
        context.Spiluges.AddRange(currentWeek, oldWeek);
        context.Plades.AddRange(p1, p2, pOld);
        await context.SaveChangesAsync();
        
        var service = new PladeService(context);
        
        var result = await service.GetAllActivePladesAsync();
        
        Assert.Equal(2, result.Count);
        Assert.Contains(result, r => r.PladeId == "p1");
        Assert.Contains(result, r => r.PladeId == "p2");
        Assert.DoesNotContain(result, r => r.PladeId == "pOld");
    }

    [Fact]
    public async Task GetAllWinningPladesAsync()
    {
        using var context = MemoryDbContext();
        var today = DateTime.Now;
        var culture = CultureInfo.CurrentCulture;
        var weekNo = culture.Calendar.GetWeekOfYear(today, culture.DateTimeFormat.CalendarWeekRule, culture.DateTimeFormat.FirstDayOfWeek);

        var currentWeek = new Spiluge { Id = 10, Ugetal = weekNo, Årstal = today.Year};
        var user = new Login { Brugerid = 1, Brugernavn = "WinnerUser", Password = "TestUser" };
        
        var winner = new Plade {Id = "winner", Ugetalid = 10, Brugerid = 1, Iswinner = true};
        var loser = new Plade {Id = "loser", Ugetalid = 10, Brugerid = 1, Iswinner = false};
        
        context.Logins.Add(user);
        context.Spiluges.Add(currentWeek);
        context.Plades.AddRange(winner, loser);
        await context.SaveChangesAsync();
        
        var service = new PladeService(context);
        
        var result = await service.GetAllWinningPladesAsync();
        
        Assert.Single(result);
        Assert.Equal("winner", result[0].PladeId);
    }
    

    [Fact]
    public async Task CalculateAndMarkWinnersAsyncTest()
    {
        using var context = MemoryDbContext();

        var spiluge = new Spiluge { Id = 10, Ugetal = 50, Årstal = 2025, Status = true };
        
        var vinderSeq = new Vindersekven { Spilugeid = 10, Vindertal = new List<int> {1,2,3} };
        spiluge.Vindersekvens = new List<Vindersekven> { vinderSeq };

        var loserPlate = new Plade
        {
            Id = "loser-id",
            Ugetalid = 10,
            Valgtetal = new List<int> { 1, 2, 99 },
            Iswinner = false
        };
        
        var winnerPlate = new Plade
        {
            Id = "winner-id",
            Ugetalid = 10,
            Valgtetal = new List<int> { 1, 2, 3,4,5 },
            Iswinner = false
        };
        
        context.Spiluges.Add(spiluge);
        context.Plades.AddRange(loserPlate, winnerPlate);
        await context.SaveChangesAsync();

        var service = new VindertalService(context);
        
        await service.CalculateAndMarkWinnersAsync(10);
        
        var dbLoser  = await context.Plades.FindAsync("loser-id");
        var dbWinner = await context.Plades.FindAsync("winner-id");
        
        Assert.False(dbLoser.Iswinner, "Loser plate remains false");
        Assert.True(dbWinner.Iswinner, "Winner plate marked as winner");


    }

    [Fact]
    public async Task StartNewWeekAsyncTest()
    {
        using var context = MemoryDbContext();
        var culture = CultureInfo.CurrentCulture;
        
        
        
        
        var today = DateTime.Now;
        var lastWeekDate = today.AddDays(-7);
        
        var currentWeek = culture.Calendar.GetWeekOfYear(today, culture.DateTimeFormat.CalendarWeekRule, culture.DateTimeFormat.FirstDayOfWeek);
        var lastWeekNo = culture.Calendar.GetWeekOfYear(lastWeekDate, culture.DateTimeFormat.CalendarWeekRule, culture.DateTimeFormat.FirstDayOfWeek);
        var currentYear = today.Year;

        var oldWeek = new Spiluge
        {
            Id = 100,
            Ugetal = lastWeekNo,
            Årstal = lastWeekDate.Year,
            Status = true
        };

        var repeatPlate = new Plade
        {
            Id = "p1",
            Brugerid = 1,
            Ugetalid = 100,
            Gentag = true,
            Valgtetal = new List<int> { 10, 20 },
            Priceid = 1,
            Status = true
        };

        var oneTimePlate = new Plade
        {
            Id = "p2",
            Brugerid = 1,
            Ugetalid = 100,
            Gentag = false,
            Valgtetal = new List<int> { 30, 40 },
            Priceid = 1,
            Status = true
        };
        
        context.Spiluges.Add(oldWeek);
        context.Plades.AddRange(repeatPlate, oneTimePlate);
        await context.SaveChangesAsync();
        
        var service = new PladeService(context);
        
        await service.StartNewWeekAsync();
        
        var targetDate = DateTime.Now;
        var expectedWeek = culture.Calendar.GetWeekOfYear(targetDate, culture.DateTimeFormat.CalendarWeekRule, culture.DateTimeFormat.FirstDayOfWeek);
        
        var newWeek = await context.Spiluges
            .FirstOrDefaultAsync(s => s.Ugetal == expectedWeek);
        
        Assert.NotNull(newWeek);

        var platesInWeek = await context.Plades
            .Where(p => p.Ugetalid == newWeek.Id)
            .ToListAsync();
        
        Assert.Single(platesInWeek);
        Assert.Equal(repeatPlate.Valgtetal, platesInWeek[0].Valgtetal);
        Assert.False(platesInWeek[0].Status);
        Assert.Equal("p1", repeatPlate.Id);
    }
    
        
}