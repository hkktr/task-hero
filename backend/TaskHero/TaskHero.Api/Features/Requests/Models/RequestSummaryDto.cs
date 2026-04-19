namespace TaskHero.Api.Features.Requests.Models;

public record RequestSummaryDto(
    int Id,
    string Title,
    RequestLocationDto Location,
    IReadOnlyList<string> Images);