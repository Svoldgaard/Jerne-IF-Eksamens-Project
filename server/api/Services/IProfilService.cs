using dataaccess.Entity;

namespace Api.Services;

public interface IProfilService
{
    
    Task<Profil> UpdateProfilAsync(int id, ProfilUpdateDto profil);
    Task<bool> DeleteProfilAsync(int id);
    Task<List<Profil>> GetAllProfils();
}