using Api.Models.Dtos.Responses;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PriceController(IPriceService priceService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<PriceResponse>>> GetPrices()
    {
        try
        {
            var result = await priceService.GetAllPricesAsync();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }
    
}