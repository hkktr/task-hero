using System.Text.Json.Serialization;

namespace TaskHero.Infrastructure.Mapbox.Models;

public class ReverseGeocodingResponse
{
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("features")]
    public List<Feature> Features { get; set; }

    [JsonPropertyName("attribution")]
    public string Attribution { get; set; }
}