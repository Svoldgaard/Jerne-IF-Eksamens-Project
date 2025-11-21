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
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProfil(int id)
    {
        var profil = await _profilService.GetProfilAsync(id);
        if (profil == null)
            return NotFound();
        return Ok(profil);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProfil([FromBody] Profil profil)
    {
        var created = await _profilService.CreateProfilAsync(profil);
        return CreatedAtAction(nameof(GetProfil), new { id = profil.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProfil(int id, [FromBody] Profil updated)
    {
        var profil = await _profilService.UpdateProfilAsync(id, updated);
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
}