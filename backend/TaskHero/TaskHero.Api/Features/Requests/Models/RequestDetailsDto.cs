using TaskHero.Api.Features.Users.Models;
using TaskHero.Domain.Requests;

namespace TaskHero.Api.Features.Requests.Models;

public record RequestDetailsDto(
    int Id,
    string Title,
    RequestType Type,
    string Description,
    RequestDateTimeDto RequestDateTime,
    int NumberOfVolunteers,
    IReadOnlyList<string> Images, 
    UserSummaryDto RequestedBy,
    LocationDto Location);