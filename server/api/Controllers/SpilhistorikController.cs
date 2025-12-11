using System.Security.Claims;
using Api.Models.Dtos.Responses;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SpilhistorikController : ControllerBase
{
    private readonly ISpilhistorikService _spilhistorikService;

    public SpilhistorikController(ISpilhistorikService spilhistorikService)
    {
        _spilhistorikService = spilhistorikService;
    }
    
    [HttpGet("spilhistorik")]
    [Authorize]
    public async Task<ActionResult<List<PladeResponse>>> GetSpilhistorik()
    {
        var idClaim = User.Claims.FirstOrDefault(c =>
            c.Type == "id" ||
            c.Type == "sub" ||
            c.Type == ClaimTypes.NameIdentifier);

        if (idClaim == null || !int.TryParse(idClaim.Value, out int userId))
            return Unauthorized("Brugeren er ikke godkendt");

        var result = await _spilhistorikService.GetSpilhistorikByUserIdAsync(userId);
        return Ok(result);
    }

    [HttpPatch("update-winner/{pladeId}")]
    [Authorize]
    public async Task<IActionResult> UpdateWinnerStatus(string pladeId)
    {
        // try
        // {
        //     // Ensure the user owns the board (optional, for security)
        //     var idClaim = User.Claims.FirstOrDefault(c =>
        //         c.Type == "sub" ||
        //         c.Type == ClaimTypes.NameIdentifier);
        //
        //     if (idClaim == null || !int.TryParse(idClaim.Value, out int userId))
        //     {
        //         return Unauthorized("User not authenticated");
        //     }
        //
        //     // Optional: verify ownership
        //     var boards = await _spilhistorikService.GetPladesByUserIdAsync(userId);
        //     if (!boards.Any(b => b.Id == pladeId))
        //         return Forbid("You don't have permission to update this board");
        //
        //     // Update winner status in database
        //     await _spilhistorikService.UpdateBoardWinnerStatusAsync(pladeId);
        //
        //     return NoContent();
        // }
        // catch (Exception ex)
        // {
        //     return StatusCode(500, "Database Error: " + ex.Message);
        // }
        try
        {
            await _spilhistorikService.UpdateBoardWinnerStatusAsync(pladeId);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Database Error: " + ex.Message);
        }
    }

    [HttpGet("spiluger")]
    public async Task<IActionResult> GetAllSpiluger()
    {
        var result = await _spilhistorikService.GetAllSpilugeAsync();
        return Ok(result);
    }

}