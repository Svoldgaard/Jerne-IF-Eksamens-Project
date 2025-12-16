using Api.Services;
using dataaccess.Entity;
using dataaccess.MyDbContext;
using Microsoft.EntityFrameworkCore;

namespace tests.ServiceTest;

public class SpilhistorikServiceTest : IClassFixture<TestFixture>
{
    private readonly SpilhistorikService _spilhistorikService;
    private readonly MyDbContext _myDbContext;

    public SpilhistorikServiceTest(TestFixture fixture)
    {
        _spilhistorikService = fixture.SpilhistorikService;
        _myDbContext = fixture.DbContext;
    }

    [Fact]
    public async Task GetSpilhistorikByUserId_ShouldReturnBoards()
    {
        // Arrange
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
        
        _myDbContext.Spiluges.Add(spiluge);
        _myDbContext.Plades.Add(plade);
        await _myDbContext.SaveChangesAsync();

        // Act
        var result = await _spilhistorikService.GetSpilhistorikByUserIdAsync(1);

        // Assert
        Assert.Single(result);
        Assert.True(result[0].IsWinner);
        Assert.Equal(50, result[0].Uge);
    }

    [Fact]
    public async Task UpdateBoardWinnerStatus_ShouldSetWinnerTrue()
    {
        // Arrange
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
        
        _myDbContext.Spiluges.Add(spiluge);
        _myDbContext.Plades.Add(plade);
        await _myDbContext.SaveChangesAsync();

        // Act
        await _spilhistorikService.UpdateBoardWinnerStatusAsync("plade-2");
        
        // Assert
        var updated = await _myDbContext.Plades.FirstAsync(p => p.Id == "plade-2");
        Assert.True(updated.Iswinner);
    }

    [Fact]
    public async Task GetAllSpiluge_ShouldReturnOrderedWeeks()
    {
        // Arrange
        _myDbContext.Spiluges.AddRange(
            new Spiluge {Ugetal = 47, Årstal = 2025},
            new Spiluge {Ugetal = 48, Årstal = 2025}
        );
        await _myDbContext.SaveChangesAsync();

        // Act
        var result = await _spilhistorikService.GetAllSpilugeAsync();

        // Assert
        Assert.Equal(2, result.Count);
        Assert.Equal(2025, result[0].Year);
    }

    [Fact]
    public async Task GetPladerForWeek_ShouldReturnAdminPlades()
    {
        // Arrange
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

        _myDbContext.Spiluges.Add(spiluge);
        _myDbContext.Logins.Add(bruger);
        _myDbContext.Plades.Add(plade);
        await _myDbContext.SaveChangesAsync();
        
        // Act
        var result = await _spilhistorikService.GetPladerForWeekAsync(2025, 46);
        
        // Assert
        Assert.Single(result);
        Assert.True(result[0].IsWinner);
        Assert.Equal("test@test.dk", result[0].Email);
    }
    
}