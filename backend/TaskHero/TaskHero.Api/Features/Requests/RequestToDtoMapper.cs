using TaskHero.Api.Features.Requests.Models;
using TaskHero.Api.Features.Users.Models;
using TaskHero.Domain.Requests;

namespace TaskHero.Api.Features.Requests;

public static class RequestToDtoMapper
{
    public static RequestDetailsDto Map(Request request)
        => new(
            Id: request.Id,
            Title: request.Title,
            Type: request.Type,
            Description: request.Description,
            RequestDateTime: new RequestDateTimeDto(request.RequestDateTime.Date, request.RequestDateTime.From,
                request.RequestDateTime.To),
            NumberOfVolunteers: request.NumberOfVolunteers,
            Images: request.Images.Select(i => i.Uri.ToString()).ToArray(),
            RequestedBy: new UserSummaryDto(request.RequestedBy.Id, request.RequestedBy.Nickname),
            Location: new RequestLocationDto(request.Location.FullAddress,
                new LatLongDto(request.Location.LatLong.Latitude, request.Location.LatLong.Longitude)));

    public static RequestSummaryDto MapSummary(Request request)
        => new(
            Id: request.Id,
            Title: request.Title,
            Images: request.Images.Select(i => i.Uri.ToString()).ToArray(),
            Location: new RequestLocationDto(request.Location.FullAddress,
                new LatLongDto(request.Location.LatLong.Latitude, request.Location.LatLong.Longitude)));
}