using System.Globalization;
using api.Models.Dtos.Request;
using dataaccess.Entity;
using dataaccess.MyDbContext;

namespace Api.Services;

public class PladeService(MyDbContext context) : IPladeService
{
    public async Task<Plade> CreatePladeAsync(PladeRequest request)
    {
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

            Valgtetal = request.SelectedNumbers.FirstOrDefault()
        };

        context.Plades.Add(newPlade);
        await context.SaveChangesAsync();

        return newPlade;


    }
}