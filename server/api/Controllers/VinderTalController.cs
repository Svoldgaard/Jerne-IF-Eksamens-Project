using api.Models.Dtos;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
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
        
        await _vintertalService.CalculateAndMarkWinnersAsync(result.Spilugeid);
        
        return Ok(result);
    }

    [HttpGet("check-winning-numbers")]
    [Authorize]
    public async Task<IActionResult> CheckWinningNumbers()
    {
        try
        {
            bool hasWinningNumbers = await _vintertalService.CheckWinningNumbers();
            return Ok(new { hasWinningNumbers = hasWinningNumbers });
        }catch (Exception ex)
        {
            return StatusCode(500, "Error checking winning numbers: " + ex.Message);
        }
    }
}