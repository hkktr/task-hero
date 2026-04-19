using System.Text.Json.Serialization;

namespace TaskHero.Infrastructure.Mapbox.Models;

public class Coordinates
{
    [JsonPropertyName("longitude")]
    public double Longitude { get; set; }

    [JsonPropertyName("latitude")]
    public double Latitude { get; set; }

    [JsonPropertyName("accuracy")]
    public string Accuracy { get; set; }

    [JsonPropertyName("routable_points")]
    public IReadOnlyList<RoutablePoint> RoutablePoints { get; set; }
}