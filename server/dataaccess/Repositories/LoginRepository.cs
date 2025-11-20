using dataaccess.Entity;
using DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;

public class LoginRepository(DbContext context) : BaseRepository<Login>(context)
{
    protected override DbSet<Login> Set => Context.Set<Login>();
}