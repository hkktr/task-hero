using Microsoft.EntityFrameworkCore;
using TaskHero.Domain.Users;
using TaskHero.Infrastructure.Data;
using TaskHero.Infrastructure.Hashing;

namespace TaskHero.Api.Seeders;

public class AdminUserSeeder(AppDbContext dbContext, AdminUserOptions options, IPasswordHashingService passwordHashingService)
{
    public async Task<bool> SeedAsync(CancellationToken cancellationToken = default)
    {
        var adminExists = await dbContext.Users.AnyAsync(x => x.IsAdmin, cancellationToken);

        if (adminExists)
        {
            return false;
        }

        var hashedPassword = await passwordHashingService.HashPasswordAsync(options.Password);

        var adminUser = new User(options.Nickname, options.EmailAddress,
            new Password(hashedPassword.Hash, hashedPassword.Salt), true);

        await dbContext.Users.AddAsync(adminUser, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }
}