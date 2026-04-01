using Microsoft.AspNetCore.Mvc;
using TaskHero.Api.Features.Users.Models;
using TaskHero.Domain.Users;
using TaskHero.Infrastructure.Data;
using TaskHero.Infrastructure.Hashing;

namespace TaskHero.Api.Features.Users;

public static class UsersEndpoints
{
    public static void MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("users", async (
                [FromBody] CreateUserRequest request,
                AppDbContext dbContext,
                IPasswordHashingService passwordHashingService,
                CancellationToken cancellationToken) =>
            {
                var (hash, salt) = await passwordHashingService.HashPasswordAsync(request.Password);
                var user = new User(request.Nickname, request.EmailAddress, new Password(hash, salt));

                await dbContext.Users.AddAsync(user, cancellationToken);
                await dbContext.SaveChangesAsync(cancellationToken);
            })
            .WithName("RegisterUserEndpoint");
    }
}