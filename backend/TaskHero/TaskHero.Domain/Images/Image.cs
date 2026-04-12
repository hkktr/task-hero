namespace TaskHero.Domain.Images;

public class Image
{
    public Guid Id { get; }
    public int UploaderId { get; }
    public string Filename { get; }
    public Uri Uri { get; }

    public Image(Guid id,
        int uploaderId,
        string filename,
        Uri uri)
    {
        Id = id;
        UploaderId = uploaderId;
        Filename = filename;
        Uri = uri;
    }

    // EF Core constructor
    private Image()
    {
    }
}