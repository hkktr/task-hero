using TaskHero.Domain.Requests;

namespace TaskHero.Api.Features.Requests.Models;

public record RequestSummaryDto(
    int Id,
    string Title,
    RequestType Type,
    RequestLocationDto Location,
    IReadOnlyList<string> Images);