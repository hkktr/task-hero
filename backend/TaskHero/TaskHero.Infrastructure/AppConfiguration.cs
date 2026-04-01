using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TaskHero.Infrastructure.Data;
using TaskHero.Infrastructure.Hashing;

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
    }
}