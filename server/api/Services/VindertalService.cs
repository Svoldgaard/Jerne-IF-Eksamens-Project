using api.Models.Dtos;
using dataaccess.Entity;
using dataaccess.MyDbContext;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public class VindertalService
{
    private readonly MyDbContext context;

    public VindertalService(MyDbContext context)
    {
        this.context = context;
    }
    public async Task<Vindersekven> CreateVindersekvens(CreateVindertalDTO dto)
    {
        try
        {
            var newSequence = new Vindersekven
            {
                Vindertal = dto.Vindertal,
                Spilugeid = dto.SpilugeID
            };

            context.Vindersekvens.Add(newSequence);
            await context.SaveChangesAsync();
            return newSequence;
        }
        catch (Exception ex)
        {
            Console.WriteLine("🔥 ERROR in CreateVindersekvens: " + ex.Message);
            Console.WriteLine(ex.StackTrace);
            throw;
        }
    }
}