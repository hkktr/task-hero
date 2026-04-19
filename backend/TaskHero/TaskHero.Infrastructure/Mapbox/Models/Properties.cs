using System.Text.Json.Serialization;

namespace TaskHero.Infrastructure.Mapbox.Models;

public class Properties
{
    [JsonPropertyName("mapbox_id")]
    public string MapboxId { get; set; }

    [JsonPropertyName("feature_type")]
    public string FeatureType { get; set; }

    [JsonPropertyName("full_address")]
    public string FullAddress { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("name_preferred")]
    public string NamePreferred { get; set; }

    [JsonPropertyName("coordinates")]
    public Coordinates Coordinates { get; set; }

    [JsonPropertyName("place_formatted")]
    public string PlaceFormatted { get; set; }

    [JsonPropertyName("context")]
    public Context Context { get; set; }

    [JsonPropertyName("bbox")]
    public List<double> Bbox { get; set; }
}