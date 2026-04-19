namespace TaskHero.Domain.Requests;

public record RequestDateTime(DateOnly Date, TimeOnly From, TimeOnly To);