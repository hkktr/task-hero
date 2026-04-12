namespace TaskHero.Infrastructure.Storage;

public interface IImageUploader
{
    Task<Uri> UploadBlobAsync(Guid id, Stream content, CancellationToken cancellationToken = default);
}