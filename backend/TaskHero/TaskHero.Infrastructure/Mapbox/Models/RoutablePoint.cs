using System.Text.Json.Serialization;

namespace TaskHero.Infrastructure.Mapbox.Models;

public class RoutablePoint
{
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("latitude")]
    public double Latitude { get; set; }

    [JsonPropertyName("longitude")]
    public double Longitude { get; set; }
}