using Api.Services;
using dataaccess.MyDbContext;
using Microsoft.EntityFrameworkCore;

namespace tests.ServiceTest;

public class TestFixture : IDisposable
{
    public MyDbContext DbContext { get; }
    public SpilhistorikService SpilhistorikService { get; }

    public TestFixture()
    {
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        DbContext = new MyDbContext(options);
        SpilhistorikService = new SpilhistorikService(DbContext);
    }

    public void Dispose()
    {
        DbContext.Database.EnsureDeleted();
        DbContext.Dispose();
    }
    
}