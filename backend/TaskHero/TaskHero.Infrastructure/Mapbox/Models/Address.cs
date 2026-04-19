using System.Text.Json.Serialization;

namespace TaskHero.Infrastructure.Mapbox.Models;

// Root myDeserializedClass = JsonSerializer.Deserialize<Root>(myJsonResponse);
    public class Address
    {
        [JsonPropertyName("mapbox_id")]
        public string MapboxId { get; set; }

        [JsonPropertyName("address_number")]
        public string AddressNumber { get; set; }

        [JsonPropertyName("street_name")]
        public string StreetName { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }