using Azure.Storage.Blobs;

namespace TaskHero.Infrastructure.Storage;

public class ImageUploader(
    BlobServiceClient blobServiceClient,
    StorageOptions storageOptions
) : IImageUploader
{
    private readonly BlobContainerClient _containerClient =
        blobServiceClient.GetBlobContainerClient(storageOptions.Containers["Images"].Name);

    public async Task<Uri> UploadBlobAsync(Guid id, Stream stream, CancellationToken cancellationToken = default)
    {
        var blobClient = _containerClient.GetBlobClient(id.ToString());
        await blobClient.UploadAsync(stream, cancellationToken);
        return blobClient.Uri;
    }
}