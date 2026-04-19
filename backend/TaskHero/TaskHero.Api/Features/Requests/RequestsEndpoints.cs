using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskHero.Api.Extensions;
using TaskHero.Api.Features.Common.Models;
using TaskHero.Api.Features.Requests.Models;
using TaskHero.Domain.Requests;
using TaskHero.Infrastructure.Data;
using TaskHero.Infrastructure.Mapbox;

namespace TaskHero.Api.Features.Requests;

public static class RequestsEndpoints
{
    public static void MapRequestEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("requests/create", async (
                ClaimsPrincipal principal,
                [FromBody] CreateReportRequest requestModel,
                AppDbContext dbContext,
                IMapboxApiClient mapboxApiClient,
                CancellationToken cancellationToken) =>
            {
                if (!principal.TryGetUserId(out var userId))
                {
                    return Results.BadRequest(new ErrorModel("The currently logged in user has invalid ID."));
                }

                var user = await dbContext.Users.SingleAsync(u => u.Id == userId, cancellationToken: cancellationToken);

                var images = await dbContext.Images
                    .Where(i => requestModel.ImageIds.Contains(i.Id) && i.UploaderId == userId)
                    .ToArrayAsync(cancellationToken);

                if (images.Length != requestModel.ImageIds.Count)
                {
                    return Results.BadRequest(new ErrorModel("Some of the requested images could not be retrieved."));
                }

                var reverseGeocodingResponse = await mapboxApiClient.ReverseGeocodeAsync(requestModel.Location.Latitude,
                    requestModel.Location.Longitude, cancellationToken);

                var feature = reverseGeocodingResponse.Features.FirstOrDefault();

                var request = new Request(
                    requestModel.Title,
                    requestModel.Type,
                    requestModel.Description,
                    new RequestDateTime(requestModel.DateTimeSlot.Date, requestModel.DateTimeSlot.From,
                        requestModel.DateTimeSlot.To),
                    requestModel.NumberOfVolunteers,
                    images,
                    new RequestLocation(feature?.Properties.Name, feature?.Properties.FullAddress,
                        new LatLong(requestModel.Location.Latitude, requestModel.Location.Longitude)),
                    user);

                await dbContext.Requests.AddAsync(request, cancellationToken);
                await dbContext.SaveChangesAsync(cancellationToken);

                return Results.Ok(RequestToDtoMapper.Map(request));
            })
            .Produces<RequestDetailsDto>()
            .Produces<ErrorModel>((int)HttpStatusCode.BadRequest)
            .RequireAuthorization();

        app.MapGet("requests/{requestId:int}", async (
                int requestId,
                AppDbContext dbContext,
                CancellationToken cancellationToken
            ) =>
            {
                var request = await dbContext.Requests
                    .Include(r => r.Images)
                    .Include(r => r.RequestedBy)
                    .SingleOrDefaultAsync(r => r.Id == requestId, cancellationToken);

                if (request is null)
                {
                    return Results.NotFound();
                }

                return Results.Ok(RequestToDtoMapper.Map(request));
            })
            .Produces<RequestDetailsDto>()
            .Produces((int)HttpStatusCode.NotFound)
            .RequireAuthorization();
    }
}