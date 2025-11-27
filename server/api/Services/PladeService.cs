using System.Globalization;
using api.Models.Dtos.Request;
using dataaccess.Entity;
using dataaccess.MyDbContext;

namespace Api.Services;

public class PladeService(MyDbContext context) : IPladeService
{
    public async Task<Plade> CreatePladeAsync(PladeRequest request)
    {

        var newPladeId = Guid.NewGuid().ToString();
        var currentCulture = CultureInfo.CurrentCulture;
        var weekNo = currentCulture.Calendar.GetWeekOfYear(
            DateTime.Now,
            currentCulture.DateTimeFormat.CalendarWeekRule,
            currentCulture.DateTimeFormat.FirstDayOfWeek);

        var newPlade = new Plade
        {
            Id = Guid.NewGuid().ToString(),

            Brugerid = request.UserId,
            Priceid = request.PriceId,
            Ugetal = weekNo,
            Gentag = request.Repeat,

            Valgtetal = 0
        };

        context.Plades.Add(newPlade);
        foreach (var number in request.SelectedNumbers )
        {
            var talRow = new Pladetal
            {
                //Pladeid = newPladeId,
                Tal = number
            };
            
            newPlade.Pladetals.Add(talRow);

        }
        context.Plades.Add(newPlade);
        
        await context.SaveChangesAsync();

        return newPlade;


    }
}