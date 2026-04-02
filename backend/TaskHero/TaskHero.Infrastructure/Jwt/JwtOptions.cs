namespace TaskHero.Infrastructure.Jwt;

public record JwtOptions
{
    public required string SecurityKey { get; init; }
    public required string Audience { get; init; } = "task-hero-frontend";
    public required string Issuer { get; init; } = "task-hero-api";
}