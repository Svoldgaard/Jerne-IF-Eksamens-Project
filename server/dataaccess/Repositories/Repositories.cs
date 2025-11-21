using dataaccess.Entity;
using dataaccess.MyDbContext;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories;


public class UserRepository(MyDbContext context) : BaseRepository<Profil>(context)
{
    protected override DbSet<Profil> Set => Context.Set<Profil>();
}


public abstract class BaseRepository<T>(MyDbContext context) : IRepository<T>
    where T : class
{
    protected DbContext Context => context;
    protected abstract DbSet<T> Set { get; }

    public async Task Add(T entity)
    {
        await Set.AddAsync(entity);
        await context.SaveChangesAsync();
    }

    public async Task Delete(T entity)
    {
        Set.Remove(entity);
        await context.SaveChangesAsync();
    }

    public T? Get(Func<T, bool> predicate)
    {
        return Set.Where(predicate).SingleOrDefault();
    }

    public IQueryable<T> Query()
    {
        return Set;
    }

    public async Task Update(T entity)
    {
        Set.Update(entity);
        await context.SaveChangesAsync();
    }
}