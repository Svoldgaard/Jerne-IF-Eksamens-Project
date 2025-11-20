using api;
using Api.Security;
using Api.Services;
using dataaccess.Entity;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


public class Program
{
    public static void ConfigureServices(IServiceCollection services, IConfiguration configuration,WebApplicationBuilder builder)
    {
        var appOptions = services.AddAppOptions(configuration);

          var connectionString = builder.Configuration.GetConnectionString("AppDb");
        builder.Services.AddDbContext<DbContext>(options =>
            options
                .UseNpgsql(connectionString)
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
        );
        

        // Repositories
        builder.Services.AddScoped<IRepository<Login>, LoginRepository>();


        // Services
        builder.Services.AddScoped<IPasswordHasher<Login>, NSecArgon2IdPasswordHasher>();
        builder.Services.AddScoped<IAuthService, AuthService>();
        builder.Services.AddScoped<ITokenService, JwtService>();
        
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
                options.TokenValidationParameters = JwtService.ValidationParameters(
                    builder.Configuration);
                // add this for debugging
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
                    },
                };
            });
        builder.Services.AddAuthorization(options =>
        {
            options.FallbackPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser()
                .Build();
        });

        services.AddControllers();
        services.AddOpenApiDocument();
        services.AddProblemDetails();
        //services.AddExceptionHandler<GlobalExceptionHandler>();
        services.AddCors();
    }

    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        ConfigureServices(builder.Services, builder.Configuration, builder);

        var app = builder.Build();

        app.UseExceptionHandler();

        app.UseCors(config => config
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin()
            .SetIsOriginAllowed(x => true));

        app.MapControllers();
        app.UseOpenApi();
        app.UseSwaggerUi();

        //await app.GenerateApiClientsFromOpenApi("/../../client/src/generated-ts-client.ts");

        app.Run();
    }
}