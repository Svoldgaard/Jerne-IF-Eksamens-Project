using System.Security.Claims;
using api.Models.Dtos.Request;
using Api.Models.Dtos.Responses;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PladeController : ControllerBase
{
    private readonly IPladeService _pladeService;

    public PladeController(IPladeService pladeService)
    {
        _pladeService = pladeService;
    }

    [HttpPost]
    public async Task<IActionResult> CreatePlade([FromBody] PladeRequest request)
    {
        try
        {
            if (request.SelectedNumbers == null || request.SelectedNumbers.Count < 5)
            {
                return BadRequest("You must select at least 5 numbers");
            }

            var result = await _pladeService.CreatePladeAsync(request);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Error creating plade: " + ex.Message);
        }
    }

    [HttpGet("my-plades")]
    public async Task<ActionResult<List<PladeResponse>>> GetPladesAsync()
    {
        try
        {
            var idClaim = User.Claims.FirstOrDefault(c =>
                c.Type == "id" ||
                c.Type == "sub" ||
                c.Type == System.Security.Claims.ClaimTypes.NameIdentifier);

            if (idClaim == null || !int.TryParse(idClaim.Value, out int userId))
            {
                return Unauthorized("User ID not found");
            }

            var result = await _pladeService.GetPladesByUserIdAsync(userId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            var message = ex.InnerException?.Message ?? ex.Message;
            Console.WriteLine("DB/SERVER ERROR: " + message);
            return StatusCode(500, "Database Error: " + message);
        }
    }

    [HttpPatch("update-gentag")]
    [Authorize]
    public async Task<IActionResult> UpdateGentagStatus([FromBody] UpdatePladeRequest request)
    {
        try
        {
            var idClaim = User.Claims.FirstOrDefault(c =>
                c.Type == "sub" ||
                c.Type == ClaimTypes.NameIdentifier);

            if (idClaim == null || !int.TryParse(idClaim.Value, out int userId))
            {
                return Unauthorized($"Bruger ID er ikke fundet");
            }

            await _pladeService.UpdateGentagStatusAsync(request.PladeId, request.Gentag);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Database Error: " + ex.Message);
        }
    }

    [HttpPatch("admin/update-betalt")]
    [Authorize]
    public async Task<IActionResult> UpdateBetaltStatus([FromBody] UpdatePladeRequest request)
    {
        try
        {
            await _pladeService.UpdateBetaltStatusAsync(request.PladeId, request.Betalt);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Database Error: " + ex.Message);
        }
    }

    [HttpGet("admin/active-plades")]
    [Authorize]
    public async Task<ActionResult<List<AdminPladeResponse>>> GetAllActivePlades()
    {
        try
        {
            var result = await _pladeService.GetAllActivePladesAsync();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);

        }
    }

    [HttpPatch(nameof(CloseCurrentWeek))]
    [Authorize]
    public async Task<IActionResult> CloseCurrentWeek()
    {
        try
        {
            await _pladeService.CloseCurrenWeekAsync();

            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Error closing week: " + ex.Message);
        }
    }

    [HttpPost(nameof(StartNewWeek))]
    [AllowAnonymous]
    public async Task<IActionResult> StartNewWeek()
    {
        try
        {
            await _pladeService.StartNewWeekAsync();
            
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Error opening week: " + ex.Message);
        }
    }

    [HttpGet("check-status")]
    [AllowAnonymous]
    public async Task<IActionResult> CheckStatus()
    {
        try
        {
            var result = await _pladeService.GetWeekStatusAsync();
            return Ok(result);
        }
        catch(Exception ex)
        {
            return StatusCode(500, "Error getting week status" + ex.Message);
        }
    }

}
