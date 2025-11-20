using dataaccess.DbContext;
using dataaccess.Entity;

namespace Api.Services;

public class ProfilService : IProfilService
{
    private readonly MyDbContext _context;
    
    public ProfilService(MyDbContext context)
    {
        _context = context;
    }

    public async Task<Profil> GetProfilAsync(int id)
    {
        return await _context.Profils.FindAsync(id);
    }

    public async Task<Profil> CreateProfilAsync(Profil profil)
    {
        _context.Profils.Add(profil);
        await _context.SaveChangesAsync();
        return profil;
    }

    public async Task<Profil> UpdateProfilAsync(int id, Profil updated)
    {
        var profil = await _context.Profils.FindAsync(id);
        if (profil == null)
            return null;
        
        profil.Fnavn = updated.Fnavn;
        profil.Lnavn = updated.Lnavn;
        profil.Email = updated.Email;
        profil.Mobil = updated.Mobil;
        
        await _context.SaveChangesAsync();
        return profil;
    }

    public async Task<bool> DeleteProfilAsync(int id)
    {
        var profil = await _context.Profils.FindAsync(id);
        if (profil == null)
            return false;
        
        _context.Profils.Remove(profil);    
        await _context.SaveChangesAsync();
        
        return true;
    }
}