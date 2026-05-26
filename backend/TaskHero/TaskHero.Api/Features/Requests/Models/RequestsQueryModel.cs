using TaskHero.Domain.Requests;

namespace TaskHero.Api.Features.Requests.Models;

public record RequestsQueryModel(ApprovalStatus? Status);