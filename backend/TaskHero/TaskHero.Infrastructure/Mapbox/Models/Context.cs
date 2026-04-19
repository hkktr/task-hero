using System.Text.Json.Serialization;

namespace TaskHero.Infrastructure.Mapbox.Models;

public class Context
{
    [JsonPropertyName("address")]
    public Address Address { get; set; }

    [JsonPropertyName("street")]
    public Street Street { get; set; }

    [JsonPropertyName("neighborhood")]
    public Neighborhood Neighborhood { get; set; }

    [JsonPropertyName("postcode")]
    public Postcode Postcode { get; set; }

    [JsonPropertyName("locality")]
    public Locality Locality { get; set; }

    [JsonPropertyName("place")]
    public Place Place { get; set; }

    [JsonPropertyName("district")]
    public District District { get; set; }

    [JsonPropertyName("region")]
    public Region Region { get; set; }

    [JsonPropertyName("country")]
    public Country Country { get; set; }
}