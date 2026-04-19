using System.Text.Json.Serialization;

namespace TaskHero.Infrastructure.Mapbox.Models;

public class Region
{
    [JsonPropertyName("mapbox_id")]
    public string MapboxId { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("wikidata_id")]
    public string WikidataId { get; set; }

    [JsonPropertyName("region_code")]
    public string RegionCode { get; set; }

    [JsonPropertyName("region_code_full")]
    public string RegionCodeFull { get; set; }
}