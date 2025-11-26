using api.Models.Dtos.Request;
using dataaccess.Entity;

namespace Api.Services;

public interface IPladeService
{
    Task<Plade> CreatePladeAsync(PladeRequest request);
}