using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace TaskHero.Api.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static bool TryGetUserId(this ClaimsPrincipal claimsPrincipal, out int userId)
    {
        userId = 0;
        var subClaimValue = claimsPrincipal.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

        return !string.IsNullOrEmpty(subClaimValue) && int.TryParse(subClaimValue, out userId);
    }
}