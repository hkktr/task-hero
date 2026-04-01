namespace TaskHero.Infrastructure.Hashing;

public record PasswordHashingOptions
{
    public int Iterations { get; init; } = 2;
    public int DegreeOfParallelism { get; init; } = 1;
    public int MemorySize { get; init; } = 19 * 1024;
}