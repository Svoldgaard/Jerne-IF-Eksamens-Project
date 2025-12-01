using api.Models.Dtos.Request;
using Api.Models.Dtos.Responses;
using Api.Services;
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
   return StatusCode(500, "Error creating plade" + ex.Message);
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

}