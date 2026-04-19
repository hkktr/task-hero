using System.Net.Http.Json;
using TaskHero.Infrastructure.Mapbox.Models;

namespace TaskHero.Infrastructure.Mapbox;

public class MapboxApiClient(
    MapboxOptions options,
    IHttpClientFactory httpClientFactory) : IMapboxApiClient
{
    private readonly HttpClient _httpClient = httpClientFactory.CreateClient(nameof(MapboxApiClient));

    public async Task<ReverseGeocodingResponse> ReverseGeocodeAsync(double latitude, double longitude,
        CancellationToken cancellationToken = default)
    {
        var path =
            $"search/geocode/v6/reverse?longitude={longitude}&latitude={latitude}&access_token={options.ApiKey}";

        return await _httpClient.GetFromJsonAsync<ReverseGeocodingResponse>(path, cancellationToken) ??
               throw new InvalidOperationException();
    }
}