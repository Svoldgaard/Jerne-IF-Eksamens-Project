using dataaccess.Entity;
using dataaccess.MyDbContext;
using DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;

public class LoginRepository(MyDbContext context) : BaseRepository<Login>(context)
{
    protected override DbSet<Login> Set => Context.Set<Login>();
}