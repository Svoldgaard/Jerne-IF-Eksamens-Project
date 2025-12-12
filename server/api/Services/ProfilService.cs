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

        var profil = await ctx.Profils.FindAsync(id);
        if (profil == null)
        {
            Console.WriteLine($"Profil med id {id} findes ikke!");
            throw new KeyNotFoundException($"Profil med id {id} findes ikke");
        }


        Console.WriteLine($"Before update: {profil.Fnavn}, {profil.Lnavn}, {profil.Email}");


        profil.Fnavn = dto.Fnavn?.Trim();
        profil.Lnavn = dto.Lnavn?.Trim();
        profil.Email = dto.Email?.Trim();

        ctx.Entry(profil).Property(p => p.Fnavn).IsModified = true;
        ctx.Entry(profil).Property(p => p.Lnavn).IsModified = true;
        ctx.Entry(profil).Property(p => p.Email).IsModified = true;

         try
        {
            var changes = await ctx.SaveChangesAsync();
            Console.WriteLine($"Rows updated: {changes}");
        }
        catch (Exception ex)
        {
            Console.WriteLine("SaveChangesAsync fejlede:");
            Console.WriteLine(ex.ToString());
            throw;
        }


        Console.WriteLine($"After update: {profil.Fnavn}, {profil.Lnavn}, {profil.Email}");

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