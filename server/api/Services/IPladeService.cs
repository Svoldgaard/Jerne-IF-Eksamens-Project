using api.Models.Dtos.Request;
using Api.Models.Dtos.Responses;
using dataaccess.Entity;

namespace Api.Services;

public interface IPladeService
{
    Task<Plade> CreatePladeAsync(PladeRequest request);

    Task<List<Plade>> GetPladeAsync(int brugerId);

    Task<List<PladeResponse>> GetPladesByUserIdAsync(int userId);

    Task<List<PladeResponse>> GetSpilhistorikByUserIdAsync(int userId);

    Task<List<SpilugeResponse>> GetAllSpilugeAsync();

    Task UpdateBoardWinnerStatusAsync(string pladeId);

    Task UpdateGentagStatusAsync(string pladeId, bool newStatus);
}