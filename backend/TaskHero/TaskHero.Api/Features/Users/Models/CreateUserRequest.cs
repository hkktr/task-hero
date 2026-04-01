using System.ComponentModel.DataAnnotations;

namespace TaskHero.Api.Features.Users.Models;

public record CreateUserRequest(
    [MinLength(3)] string Nickname,
    [EmailAddress] string EmailAddress,
    [Length(8, 60)] string Password);