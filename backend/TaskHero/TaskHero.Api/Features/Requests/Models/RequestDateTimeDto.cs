namespace TaskHero.Api.Features.Requests.Models;

public record RequestDateTimeDto(DateOnly Date, TimeOnly From, TimeOnly To);