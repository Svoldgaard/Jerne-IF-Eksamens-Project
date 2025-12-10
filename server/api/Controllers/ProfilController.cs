using Api.Services;
using dataaccess.MyDbContext;
using dataaccess.Entity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ProfilController : ControllerBase
{
    private readonly IProfilService _profilService;
    
    public ProfilController(IProfilService profilService)
    {
        _profilService = profilService;
    }
    
    

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProfil(int id, [FromBody] ProfilUpdateDto dto)
    {
        var profil = await _profilService.UpdateProfilAsync(id, dto);

        if (profil == null)
            return NotFound();

        return Ok(profil);
    }


    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProfil(int id)
    {
        var deleted = await _profilService.DeleteProfilAsync(id);
        if (!deleted)
            return NotFound();
        
        return NoContent();
    }

    [HttpGet("GetAllProfile")]
    [Produces("application/json")]
    public async Task<ActionResult<List<ProfilDto>>> GetAllProfil()
    {
        var profils = await _profilService.GetAllProfils();
        return Ok(profils);
    }

    [HttpPost("UpdateStatus")]
    [Consumes("application/json")]
    public async Task<ActionResult<bool>> UpdateStatus([FromBody] ProfilDto dto)
    {
        var success = await _profilService.UpdateStatus(dto);
        if (!success) return NotFound("Profile not found");

        return Ok(true);
    }
}