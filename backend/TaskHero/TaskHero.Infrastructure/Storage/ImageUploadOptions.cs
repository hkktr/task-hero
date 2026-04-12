namespace TaskHero.Infrastructure.Storage;

public class ImageUploadOptions
{
    public required IReadOnlyList<string> AllowedContentTypes { get; init; }
    public required long MaxFileSize { get; init; }
}