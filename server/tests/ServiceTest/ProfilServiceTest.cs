using api.Controllers;
using Api.Services;
using dataaccess.Entity;
using dataaccess.MyDbContext;
using Microsoft.EntityFrameworkCore;



namespace tests.ServiceTest;

public class ProfilServiceTest
{
    [Fact]
    public async Task ReturnForAdmin()
    {
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        using var ctx = new MyDbContext(options);
        var service = new ProfilService(ctx);

        var profil = new Profil
        {
            Fnavn = "Admin",
            Lnavn = "Admin",
            Email = "Admin@admin.dk",
            Aktiv = true,
            Brugerid = 1,
            Rolleid = 1,
            Bruger = null!,
            Rolle = null!
        };
        ctx.Profils.Add(profil);
        ctx.SaveChanges();

        var result = await service.GetAllProfils();
        
        Assert.Single(result);                  
        Assert.Equal("Admin", result[0].Fnavn);
    }

    [Fact]
    public async Task ReturnForBruger()
    {
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_User")
            .Options;

        using var ctx = new MyDbContext(options);
        var service = new ProfilService(ctx);

        var profil = new Profil
        {
            Fnavn = "Bruger",
            Lnavn = "Test",
            Email = "bruger@test.dk",
            Aktiv = true,
            Brugerid = 2,
            Rolleid = 2,
            Bruger = null!,
            Rolle = null!
        };
        ctx.Profils.Add(profil);
        ctx.SaveChanges();

        var result = await service.GetAllProfils();

        Assert.NotNull(result);
        Assert.Single(result);                  
        Assert.Equal("Bruger", result[0].Fnavn);
    }

    [Fact]
    public async Task CreateProfil()
    {
        //Arrange
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_Create")
            .Options;
        using var ctx = new MyDbContext(options);
        var service = new ProfilService(ctx);
        
        var profil = new Profil { Fnavn = "Ny", Lnavn = "Bruger", Email = "ny@test.com" };
        
        // Act
        var result = await service.CreateProfilAsync(profil);
        
        // Assert
        Assert.NotNull(result);
        Assert.Equal("ny@test.com", result.Email);
    }

    [Fact]
    public async Task UpdateProfil()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_Update")
            .Options;
        using var ctx = new MyDbContext(options);
        var service = new ProfilService(ctx);


        var profil = new Profil { Fnavn = "Old", Lnavn = "Name", Email = "old@test.com" };
        ctx.Profils.Add(profil);
        ctx.SaveChanges();
        
        var dto = new ProfilUpdateDto { Fnavn = "New", Lnavn = "Name", Email = "new@test.com" };
        
        // Act
        var updated = await service.UpdateProfilAsync(profil.Id, dto);

        // Assert
        Assert.Equal("New", updated.Fnavn);
        Assert.Equal("new@test.com", updated.Email);
    }
    
    [Fact]
    public async Task UpdateProfil_Should_Throw_When_NotFound()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_UpdateNotFound")
            .Options;
        using var ctx = new MyDbContext(options);
        var service = new ProfilService(ctx);
        
        var dto = new ProfilUpdateDto { Fnavn = "X", Lnavn = "Y", Email = "x@test.com" };
        
        // Act + Assert
        await Assert.ThrowsAsync<KeyNotFoundException>(() => service.UpdateProfilAsync(999, dto));
    }
    
    [Fact]
    public async Task Should_Delete_Profil()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_Delete")
            .Options;
        using var ctx = new MyDbContext(options);
        var service = new ProfilService(ctx);
        
        var profil = new Profil { Fnavn = "Delete", Lnavn = "Me", Email = "del@test.com" };
        ctx.Profils.Add(profil);
        ctx.SaveChanges();
        
        // Act
        var result = await service.DeleteProfilAsync(profil.Id);
        
        // Assert
        Assert.True(result);
    }
    
    [Fact]
    public async Task Should_Get_All_Profils()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_All")
            .Options;
        using var ctx = new MyDbContext(options);
        var service = new ProfilService(ctx);
        
        ctx.Profils.Add(new Profil { Fnavn = "A", Lnavn = "A", Email = "a@test.com" });
        ctx.Profils.Add(new Profil { Fnavn = "B", Lnavn = "B", Email = "b@test.com" });
        ctx.SaveChanges();
        
        // Act
        var result = await service.GetAllProfils();
        
        // Assert
        Assert.Equal(2, result.Count);
    }
    
    [Fact]
    public async Task Should_Update_Status()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_Status")
            .Options;
        using var ctx = new MyDbContext(options);
        var service = new ProfilService(ctx);


        var profil = new Profil { Fnavn = "Status", Lnavn = "Test", Email = "status@test.com", Aktiv = false };
        ctx.Profils.Add(profil);
        ctx.SaveChanges();


        var dto = new ProfilDto { Email = "status@test.com", Aktiv = true };


        // Act
        var result = await service.UpdateStatus(dto);


        // Assert
        Assert.True(result);
        Assert.True(profil.Aktiv);
    }
    
    [Fact]
    public async Task GetProfil_Returns_Profil()
    {
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_Mock")
            .Options;

        using var ctx = new MyDbContext(options);
        var service = new ProfilService(ctx);

        var profil = new Profil { Id = 1, Fnavn = "Mock", Email = "mock@test.com", Lnavn="Test", Aktiv=true, Brugerid=1, Rolleid=1, Bruger=null!, Rolle=null! };
        ctx.Profils.Add(profil);
        ctx.SaveChanges();

        var result = await service.GetProfilAsync(1);

        Assert.NotNull(result);
        Assert.Equal("Mock", result.Fnavn);
    }

}