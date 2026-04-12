using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using TaskHero.Api.Extensions;
using TaskHero.Api.Features.Common.Models;
using TaskHero.Api.Features.Images.Models;
using TaskHero.Domain.Images;
using TaskHero.Infrastructure.Data;
using TaskHero.Infrastructure.Storage;

namespace TaskHero.Api.Features.Images;

public static class ImageEndpoints
{
    public static void MapImageEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("images/upload", async (
                ClaimsPrincipal principal,
                [FromForm] IFormFile file,
                AppDbContext dbContext,
                IImageUploader imageUploader,
                ImageUploadOptions options,
                CancellationToken cancellationToken) =>
            {
                if (!principal.TryGetUserId(out var userId))
                {
                    return Results.BadRequest(new ErrorModel("The currently logged in user has invalid ID."));
                }

                if (!options.AllowedContentTypes.Contains(file.ContentType))
                {
                    return Results.BadRequest(new ErrorModel("Disallowed file type."));
                }

                if (options.MaxFileSize < file.Length)
                {
                    return Results.BadRequest(new ErrorModel("Too big file."));
                }

                await using var stream = file.OpenReadStream();

                var imageId = Guid.NewGuid();
                var blobUri = await imageUploader.UploadBlobAsync(imageId, stream, cancellationToken);
                var image = new Image(imageId, userId, file.Name, blobUri);

                await dbContext.Images.AddAsync(image, cancellationToken);
                await dbContext.SaveChangesAsync(cancellationToken);

                return Results.Ok(new ImageUploadedResponse(imageId, image.Uri));
            })
            .Produces<ImageUploadedResponse>()
            .Produces<ErrorModel>((int)HttpStatusCode.BadRequest)
            .DisableAntiforgery()
            .RequireAuthorization();
    }
}