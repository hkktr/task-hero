using System.ComponentModel.DataAnnotations;

namespace TaskHero.Api.Features.Users.Models;

public record CreateUserRequest(
    [Length(3, 60)] string Nickname,
    [EmailAddress] string EmailAddress,
    [Length(8, 60)] string Password);