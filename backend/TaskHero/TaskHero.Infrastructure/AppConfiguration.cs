using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using TaskHero.Infrastructure.Data;
using TaskHero.Infrastructure.Hashing;
using TaskHero.Infrastructure.Jwt;

namespace TaskHero.Infrastructure;

public static class AppConfiguration
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration,
        bool isDevelopment)
    {
        var passwordHashingOptions = configuration.GetSection("PasswordHashingOptions").Get<PasswordHashingOptions>() ??
                                     new PasswordHashingOptions();

        services.AddSingleton(passwordHashingOptions);
        services.AddSingleton<IPasswordHashingService, PasswordHashingService>();

        services.AddDbContext<AppDbContext>(options =>
        {
            if (isDevelopment)
            {
                options.UseSqlServer(configuration.GetConnectionString("Default"));
            }
            else
            {
                options.UseAzureSql(configuration["AZURE_SQL_CONNECTIONSTRING"]);
            }
        });
        
        Microsoft.IdentityModel.JsonWebTokens.JsonWebTokenHandler.DefaultInboundClaimTypeMap.Clear();

        var jwtOptions = configuration.GetRequiredSection("JwtOptions").Get<JwtOptions>()!;
        services.AddSingleton(jwtOptions);
        services.AddSingleton<IJwtIssuer, JwtIssuer>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt => ApplyDefaultJwtOptions(opt, jwtOptions));

        services.AddAuthorization();
    }
    
    private static void ApplyDefaultJwtOptions(JwtBearerOptions bearerOptions, JwtOptions jwtValidationOptions)
    {
        bearerOptions.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtValidationOptions.SecurityKey)),
            ValidateLifetime = true,
            ValidateIssuer = true,
            ValidIssuer = jwtValidationOptions.Issuer,
            ValidateAudience = true,
            ValidAudience = jwtValidationOptions.Audience
        };
    }
}