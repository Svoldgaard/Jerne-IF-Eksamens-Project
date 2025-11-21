using dataaccess.Entity;

namespace Api.Services;

public interface IProfilService
{
    Task<Profil> GetProfilAsync(int id);
    Task<Profil> CreateProfilAsync(Profil profil);
    Task<Profil> UpdateProfilAsync(int id, Profil profil);
    Task<bool> DeleteProfilAsync(int id);
}