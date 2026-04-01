namespace TaskHero.Infrastructure.Hashing;

public interface IPasswordHashingService
{
    Task<HashResult> HashPasswordAsync(string password);
    Task<bool> VerifyPasswordAsync(string hashedPassword, string password, string salt);
}