namespace TaskHero.Domain.Users;

public record Password(string Hash, string Salt);