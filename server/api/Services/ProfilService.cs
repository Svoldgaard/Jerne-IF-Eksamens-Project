using api.Controllers;
using api.Models.Dtos;
using dataaccess.MyDbContext;
using dataaccess.Entity;
using dataaccess.MyDbContext;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public class ProfilService(MyDbContext ctx) : IProfilService
{

    public async Task<Profil> GetProfilAsync(int id)
    {
        return await ctx.Profils.FindAsync(id);
    }

    public async Task<Profil> CreateProfilAsync(Profil profil)
    {
        ctx.Profils.Add(profil);
        await ctx.SaveChangesAsync();
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

        await ctx.SaveChangesAsync();   
        return profil;
    }




    public async Task<bool> DeleteProfilAsync(int id)
    {
        var profil = await ctx.Profils.FindAsync(id);
        if (profil == null)
            return false;
        
        ctx.Profils.Remove(profil);    
        await ctx.SaveChangesAsync();
        
        return true;
    }

    public async Task<List<Profil>> GetAllProfils()
    {
        return await ctx.Profils
            .Select(p => new Profil
            {
                Fnavn = p.Fnavn,
                Lnavn = p.Lnavn,
                Email = p.Email,
                Aktiv = p.Aktiv,
            }).ToListAsync();
    }

    public async Task<bool> UpdateStatus(ProfilDto dto)
    {
        var profil = await ctx.Profils.FirstOrDefaultAsync(p => p.Email == dto.Email);
        if (profil == null) return false;
        
        profil.Aktiv = dto.Aktiv;
        ctx.Entry(profil).Property(p => p.Aktiv).IsModified = true;

        await ctx.SaveChangesAsync();
        return true;
    }


}