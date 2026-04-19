using TaskHero.Infrastructure.Mapbox.Models;

namespace TaskHero.Infrastructure.Mapbox;

public interface IMapboxApiClient
{
    Task<ReverseGeocodingResponse> ReverseGeocodeAsync(double latitude, double longitude,
        CancellationToken cancellationToken = default);
}