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
    public RequestLocation Location { get; }
    public User RequestedBy { get; }
    public ApprovalStatus ApprovalStatus { get; private set; } = ApprovalStatus.Pending;

    private readonly List<Image> _images = new();
    
    public Request(
        string title,
        RequestType type,
        string description,
        RequestDateTime requestDateTime,
        int numberOfVolunteers,
        IReadOnlyList<Image> images,
        RequestLocation location,
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

    public void Approve()
    {
        if (ApprovalStatus != ApprovalStatus.Pending)
        {
            throw new InvalidOperationException("Cannot approve a record that isn't pending approval.");
        }

        ApprovalStatus = ApprovalStatus.Approved;
    }

    public void Reject()
    {
        if (ApprovalStatus != ApprovalStatus.Pending)
        {
            throw new InvalidOperationException("Cannot reject a record that isn't pending approval.");
        }

        ApprovalStatus = ApprovalStatus.Rejected;
    }
}