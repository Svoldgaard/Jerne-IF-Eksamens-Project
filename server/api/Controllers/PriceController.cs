using Api.Models.Dtos.Responses;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/pricing")]
public class PriceController(IPriceService priceService) : ControllerBase
{
    [HttpGet("fetchPricing")]
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