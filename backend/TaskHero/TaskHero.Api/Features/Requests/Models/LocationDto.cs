using System.ComponentModel.DataAnnotations;

namespace TaskHero.Api.Features.Requests.Models;

public record LocationDto(
    [Range(-90.0000000, 90.0000000)] double Latitude,
    [Range(-180.0000000, 180.0000000)] double Longitude);