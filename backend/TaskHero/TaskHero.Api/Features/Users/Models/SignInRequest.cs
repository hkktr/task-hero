using System.ComponentModel.DataAnnotations;

namespace TaskHero.Api.Features.Users.Models;

public record SignInRequest([Length(3, 60)] string Nickname, [Length(3, 60)] string Password);