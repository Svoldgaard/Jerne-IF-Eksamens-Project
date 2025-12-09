using dataaccess.MyDbContext;
using dataaccess.Entity;
using dataaccess.MyDbContext;

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

    public async Task<Profil> UpdateProfilAsync(int id, ProfilUpdateDto dto)
    {
        var profil = await GetProfilAsync(id);  

        if (profil == null)
            return null;

        profil.Fnavn = dto.Fnavn;
        profil.Lnavn = dto.Lnavn;
        profil.Email = dto.Email;
        profil.Mobil = dto.Mobil;

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