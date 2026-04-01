using System.Security.Cryptography;
using System.Text;
using Konscious.Security.Cryptography;

namespace TaskHero.Infrastructure.Hashing;

public class PasswordHashingService(PasswordHashingOptions options) : IPasswordHashingService
{
    public async Task<HashResult> HashPasswordAsync(string password)
    {
        var saltBytes = GetRandomBytes(16);
        return await HashPasswordWithSaltAsync(password, saltBytes);
    }

    private async Task<HashResult> HashPasswordWithSaltAsync(string password, byte[] saltBytes)
    {
        var passwordBytes = Encoding.UTF8.GetBytes(password);
        using var argon2 = new Argon2id(passwordBytes)
        {
            Iterations = options.Iterations,
            DegreeOfParallelism = options.DegreeOfParallelism,
            MemorySize = options.MemorySize,
            Salt = saltBytes
        };
        var hashedBytes = await argon2.GetBytesAsync(32);

        return new HashResult
        (
            Hash: Convert.ToBase64String(hashedBytes),
            Salt: Convert.ToBase64String(saltBytes)
        );
    }

    public async Task<bool> VerifyPasswordAsync(string hashedPassword, string password, string salt)
    {
        var saltBytes = Convert.FromBase64String(salt);
        var result = await HashPasswordWithSaltAsync(password, saltBytes);
        return result.Hash == hashedPassword;
    }

    private static byte[] GetRandomBytes(int size)
    {
        var salt = new byte[size];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(salt);

        return salt;
    }
}

public record HashResult(string Hash, string Salt);