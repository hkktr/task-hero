using System.Text.Json.Serialization;

namespace TaskHero.Infrastructure.Mapbox.Models;

public class Locality
{
    [JsonPropertyName("mapbox_id")]
    public string MapboxId { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("wikidata_id")]
    public string WikidataId { get; set; }
}