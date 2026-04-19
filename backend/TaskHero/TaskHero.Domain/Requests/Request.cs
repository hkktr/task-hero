using TaskHero.Domain.Images;
using TaskHero.Domain.Users;

namespace TaskHero.Domain.Requests;

public class Request
{
    public int Id { get; }
    public string Title { get; }
    public RequestType Type { get; }
    public string Description { get; }
    public RequestDateTime RequestDateTime { get; }
    public int NumberOfVolunteers { get; }
    public IReadOnlyList<Image> Images => _images.AsReadOnly();
    public LatLong Location { get; }
    public User RequestedBy { get; }

    private readonly List<Image> _images = new();
    
    public Request(
        string title,
        RequestType type,
        string description,
        RequestDateTime requestDateTime,
        int numberOfVolunteers,
        IReadOnlyList<Image> images,
        LatLong location,
        User requestedBy)
    {
        Title = title;
        Type = type;
        Description = description;
        RequestDateTime = requestDateTime;
        NumberOfVolunteers = numberOfVolunteers;
        _images = images.ToList();
        Location = location;
        RequestedBy = requestedBy;
    }
    
    // EF Core constructor
    private Request()
    {
    }
}