using api.Models.Dtos;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("vindertal")]
public class VinderTalController : ControllerBase
{
    private readonly VindertalService _vintertalService;

    public VinderTalController(VindertalService vindertalService)
    {
        _vintertalService = vindertalService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateVindertal([FromBody] CreateVindertalDTO dto)
    {
        var result = await _vintertalService.CreateVindersekvens(dto);
        return Ok(result);
    }
}