using Api.Services;
using dataaccess.Entity;
using dataaccess.MyDbContext;
using Microsoft.EntityFrameworkCore;

namespace tests.ServiceTest;

public class SpilhistorikServiceTest
{
    private static SpilhistorikService CreateService(out MyDbContext ctx)
    {
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        ctx = new MyDbContext(options);
        return new SpilhistorikService(ctx);
    }

    [Fact]
    public async Task GetSpilhistorikByUserId_ShouldReturnBoards()
    {
        // Arrange
        var service = CreateService(out var ctx);
        
        var spiluge = new Spiluge
        {
            Id = 1,
            Ugetal = 50,
            Årstal = 2025,
            Vindersekvens = new List<Vindersekven>()
            {
                new Vindersekven { Vindertal = new List<int> { 7, 6, 13 } }
            }
        };

        var plade = new Plade
        {
            Id = "plade-1",
            Brugerid = 1,
            Valgtetal = new List<int> { 7, 6, 13, 2, 16 },
            Ugetal = spiluge
        };
        
        ctx.Spiluges.Add(spiluge);
        ctx.Plades.Add(plade);
        await ctx.SaveChangesAsync();

        // Act
        var result = await service.GetSpilhistorikByUserIdAsync(1);

        // Assert
        Assert.Single(result);
        Assert.True(result[0].IsWinner);
        Assert.Equal(50, result[0].Uge);
    }

    [Fact]
    public async Task GetSpilhistorikByUsereId_ShouldReturnEmpty_WhenUserHasNoBoards()
    {
        // Arrange
        var service = CreateService(out var ctx);
        
        // Act
        var result = await service.GetSpilhistorikByUserIdAsync(999);

        // Assert
        Assert.NotNull(result);
        Assert.Empty(result);
    }

    [Fact]
    public async Task UpdateBoardWinnerStatus_ShouldSetWinnerTrue()
    {
        // Arrange
        var service = CreateService(out var ctx);
        
        var spiluge = new Spiluge
        {
            Id = 2,
            Ugetal = 49,
            Årstal = 2025,
            Vindersekvens = new List<Vindersekven>()
            {
                new Vindersekven { Vindertal = new List<int> { 3, 9, 10 } }
            }
        };

        var plade = new Plade
        {
            Id = "plade-2",
            Valgtetal = new List<int> { 3, 9, 13, 2, 10 },
            Iswinner = false,
            Ugetal = spiluge
        };
        
        ctx.Spiluges.Add(spiluge);
        ctx.Plades.Add(plade);
        await ctx.SaveChangesAsync();

        // Act
        await service.UpdateBoardWinnerStatusAsync("plade-2");
        
        // Assert
        var updated = await ctx.Plades.FirstAsync(p => p.Id == "plade-2");
        Assert.True(updated.Iswinner);
    }

    [Fact]
    public async Task UpdateBoardWinnerStatus_ShouldNotUpdate_WhenNoWinningNumbers()
    {
        // Arrange
        var service = CreateService(out var ctx);
        
        var spiluge = new Spiluge
        {
            Ugetal = 45,
            Årstal = 2025,
            Vindersekvens = new List<Vindersekven>()
        };

        var plade = new Plade
        {
            Id = "plade-3",
            Valgtetal = new List<int> { 3, 9, 13, 8, 10 },
            Iswinner = false,
            Ugetal = spiluge
        };
        
        ctx.Spiluges.Add(spiluge);
        ctx.Plades.Add(plade);
        await ctx.SaveChangesAsync();
     
        // Act
        await service.UpdateBoardWinnerStatusAsync("plade-3");
        
        // Assert
        var updated = await ctx.Plades.FirstAsync(p => p.Id == "plade-3");
        Assert.False(updated.Iswinner);
        
    }
    
    [Fact]
    public async Task GetAllSpiluge_ShouldReturnOrderedWeeks()
    {
        // Arrange
        var service = CreateService(out var ctx);
        
        ctx.Spiluges.AddRange(
            new Spiluge {Ugetal = 47, Årstal = 2025},
            new Spiluge {Ugetal = 48, Årstal = 2025}
        );

        await ctx.SaveChangesAsync();
        
        // Act
        var result = await service.GetAllSpilugeAsync();

        // Assert
        Assert.Equal(2, result.Count);
        Assert.Equal(2025, result[0].Year);
    }

    [Fact]
    public async Task GetAllSpilUge_ShouldReturnEmpty_WhenNoWeeksExist()
    {
        // Arrange
        var service = CreateService(out var ctx);
        
        // Act
        var result = await service.GetAllSpilugeAsync();
        
        // Assert
        Assert.NotNull(result);
        Assert.Empty(result);
    }

    [Fact]
    public async Task GetPladerForWeek_ShouldReturnAdminPlades()
    {
        // Arrange
        var service = CreateService(out var ctx);
        
        var spiluge = new Spiluge
        {
            Id = 3,
            Ugetal = 46,
            Årstal = 2025,
            Vindersekvens = new List<Vindersekven>()
            {
                new Vindersekven { Vindertal = new List<int> { 6, 7, 15 } }
            }
        };

        var bruger = new Login
        {
            Brugerid = 1,
            Brugernavn = "testuser",
            Password = "test-password",
            Profils = new List<Profil>()
            {
                new Profil
                {
                    Email = "test@test.dk",
                    Fnavn = "test-fnavn",
                    Lnavn = "test-lnavn",
                }
            }
        };

        var plade = new Plade
        {
            Id = "plade-3",
            Ugetal = spiluge,
            Brugerid = 1,
            Bruger = bruger,
            Valgtetal = new List<int> { 6, 7, 15, 2, 16 },
        };

        ctx.Spiluges.Add(spiluge);
        ctx.Logins.Add(bruger);
        ctx.Plades.Add(plade);
        await ctx.SaveChangesAsync();
        
        // Act
        var result = await service.GetPladerForWeekAsync(2025, 46);
        
        // Assert
        Assert.Single(result);
        Assert.True(result[0].IsWinner);
        Assert.Equal("test@test.dk", result[0].Email);
    }

    [Fact]
    public async Task GetPladerForWeek_ShouldReturnEmpty_WhenWeekDoesNotExist()
    {
        // Arrange
        var service = CreateService(out var ctx);
        
        // Act
        var result = await service.GetPladerForWeekAsync(2025, 99);
        
        // Assert
        Assert.Empty(result);
        Assert.Empty(result);
    }
}