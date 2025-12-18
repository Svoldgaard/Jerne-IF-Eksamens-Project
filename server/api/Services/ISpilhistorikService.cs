using Api.Models.Dtos.Responses;

namespace Api.Services;

public interface ISpilhistorikService
{
    Task<List<PladeResponse>> GetSpilhistorikByUserIdAsync(int userId);
    Task<List<SpilugeResponse>> GetAllSpilugeAsync();
    Task UpdateBoardWinnerStatusAsync(string pladeId);
    Task<List<AdminPladeResponse>> GetPladerForWeekAsync(int year, int week);
}