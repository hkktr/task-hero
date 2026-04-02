using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskHero.Api.Features.Common.Models;
using TaskHero.Api.Features.Users.Models;
using TaskHero.Domain.Users;
using TaskHero.Infrastructure.Data;
using TaskHero.Infrastructure.Hashing;
using TaskHero.Infrastructure.Jwt;

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

        app.MapPost("sign-in", async (
                [FromBody] SignInRequest request,
                AppDbContext dbContext,
                IPasswordHashingService passwordHashingService,
                IJwtIssuer jwtIssuer) =>
            {
                var user = await dbContext.Users.SingleOrDefaultAsync(u => u.Nickname == request.Nickname);

                if (user is null)
                {
                    return Results.NotFound(
                        new ErrorModel("User with the specified nickname and password was not found."));
                }

                var isCorrectPassword =
                    await passwordHashingService.VerifyPasswordAsync(user.Password.Hash, request.Password,
                        user.Password.Salt);

                if (!isCorrectPassword)
                {
                    return Results.NotFound(
                        new ErrorModel("User with the specified nickname and password was not found."));
                }

                var jwt = jwtIssuer.IssueToken(
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Name, user.Nickname),
                    new Claim(JwtRegisteredClaimNames.Email, user.EmailAddress)
                );

                return Results.Ok(new SuccessfulSignInResponse(jwt));
            })
            .Produces<SuccessfulSignInResponse>()
            .WithName("SignInEndpoint");

        app.MapGet("me", async (AppDbContext dbContext, ClaimsPrincipal principal) =>
            {
                var subClaimValue = principal.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

                if (string.IsNullOrEmpty(subClaimValue) || !int.TryParse(subClaimValue, out var userId))
                {
                    return Results.BadRequest(new ErrorModel("The currently logged in user has invalid ID."));
                }
                
                var user = await dbContext.Users.SingleOrDefaultAsync(u => u.Id == userId);

                if (user is null)
                {
                    return Results.NotFound(
                        new ErrorModel("User with the specified nickname and password was not found."));
                }

                return Results.Ok(new GetMeUserResponse(user.Id, user.EmailAddress, user.Nickname));
            })
            .WithName("GetMeUserEndpoint")
            .Produces<GetMeUserResponse>()
            .RequireAuthorization();
    }
}