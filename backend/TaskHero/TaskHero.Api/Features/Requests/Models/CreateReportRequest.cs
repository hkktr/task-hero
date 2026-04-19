using System.ComponentModel.DataAnnotations;
using TaskHero.Domain.Requests;

namespace TaskHero.Api.Features.Requests.Models;

public record CreateReportRequest(
    [Length(4, 50)] string Title,
    [Required] RequestType Type,
    [MaxLength(2000)] string Description,
    [Required] RequestDateTimeDto DateTimeSlot,
    [Range(1, 20)] int NumberOfVolunteers,
    [Length(1, 10)] IReadOnlyList<Guid> ImageIds,
    [Required] LocationDto Location);