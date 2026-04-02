using System.Security.Claims;

namespace TaskHero.Infrastructure.Jwt;

public interface IJwtIssuer
{
    string IssueToken(params IReadOnlyCollection<Claim> claims);
}