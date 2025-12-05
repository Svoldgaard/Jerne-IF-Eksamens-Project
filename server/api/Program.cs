using System.Text.Json.Serialization;
using api;
using Api.Security;
using Api.Services;
using dataaccess.Entity;
using dataaccess.MyDbContext;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class Program
{
    public static void ConfigureServices(IServiceCollection services, IConfiguration configuration, WebApplicationBuilder builder)
    {
        var appOptions = services.AddAppOptions(configuration);

        // Use concrete AppDbContext instead of abstract DbContext
        var connectionString = appOptions.DbConnectionString;
        builder.Services.AddDbContext<MyDbContext>(options =>
            options.UseNpgsql(connectionString)
                   .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
        );

        // Repositories
        builder.Services.AddScoped<IRepository<Login>, LoginRepository>();
        builder.Services.AddScoped<IRepository<Profil>, UserRepository>();

        // Services
        builder.Services.AddScoped<IPasswordHasher<Login>, NSecArgon2IdPasswordHasher>();
        builder.Services.AddScoped<IAuthService, AuthService>();
        builder.Services.AddScoped<ITokenService, JwtService>();
        builder.Services.AddScoped<IPriceService, PriceService>();
        builder.Services.AddScoped<IPladeService, PladeService>();
        


        builder.Services.AddScoped<IProfilService, ProfilService>();
        
        // Authentication & Authorization
        builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = JwtService.ValidationParameters(builder.Configuration);

                // Debug logging
                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine($"Authentication failed: {context.Exception}");
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        Console.WriteLine("Token Validated Successfully");
                        return Task.CompletedTask;
                    }
                };
            });

        builder.Services.AddAuthorization();
        

        // Controllers & OpenAPI / Swagger
        services.AddControllers().AddJsonOptions(x =>
        {
            x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });
        services.AddOpenApiDocument();
        services.AddProblemDetails();

        // CORS
        services.AddCors();
    }

    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Configure services
        ConfigureServices(builder.Services, builder.Configuration, builder);

        var app = builder.Build();

        // Middleware pipeline
        app.UseExceptionHandler();
        app.UseRouting();

        app.UseCors(config => config
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin());

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseOpenApi();
        app.UseSwaggerUi();
        await app.GenerateApiClientsFromOpenApi("/../../client/src/generated-ts-client.ts");

        app.MapControllers();

        await app.RunAsync();
        
        
        
    }
}
