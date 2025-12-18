using Api.Services;
using dataaccess.Entity;
using dataaccess.MyDbContext;
using Microsoft.EntityFrameworkCore;

namespace tests.ServiceTest;

public class PriceServiceTest
{
    private MyDbContext MemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        
        return new MyDbContext(options);
    }

    [Fact]
    public async Task GetAllPricesAsyncTest()
    {
        using var context = MemoryDbContext();
        
        var price1 = new Pricing { Id = 1, Price = 20 };
        var price2 = new Pricing { Id = 2, Price = 40 };
        var price3 = new Pricing { Id = 3, Price = 80 };
        var price4 = new Pricing { Id = 4, Price = 160 };
        
        context.Pricings.AddRange(price1, price2, price3, price4);
        await context.SaveChangesAsync();
        
        var service = new PriceService(context);
        
        var result = await service.GetAllPricesAsync();
        
        Assert.Equal(4, result.Count);
        Assert.Equal(1, result[0].Amount);
        Assert.Equal(20, result[0].Price);
    }
}