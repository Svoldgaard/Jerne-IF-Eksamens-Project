using api.Models.Dtos.Request;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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

        [HttpGet]
        public async Task<IActionResult> GetPlade(int brugerId)
        {
            var plader = await _pladeService.GetPladeAsync(brugerId);
            return Ok(plader);
        }
    }
}