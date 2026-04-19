namespace TaskHero.Domain.Requests;

public record RequestLocation(string? Name, string? FullAddress, LatLong LatLong)
{
    // EF Core constructor
    private RequestLocation() : this(null, null, null!)
    {
    }
}