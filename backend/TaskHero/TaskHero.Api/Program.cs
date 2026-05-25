using System.Text.Json.Serialization;
using Azure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using Scalar.AspNetCore;
using TaskHero.Api.Features.Images;
using TaskHero.Api.Features.Requests;
using TaskHero.Api.Features.Users;
using TaskHero.Api.Seeders;
using TaskHero.Infrastructure;
using TaskHero.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Configuration.AddAzureKeyVault(new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/"),
    new DefaultAzureCredential());
builder.Services.AddValidation();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.NumberHandling = JsonNumberHandling.Strict;
});
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, _, _) =>
    {
        document.Components ??= new OpenApiComponents();
        document.Components.SecuritySchemes = new Dictionary<string, IOpenApiSecurityScheme>
        {
            ["bearer"] = new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Name = "Authorization",
                Scheme = "Bearer",
                In = ParameterLocation.Header
            }
        };
        return Task.CompletedTask;
    });
});
builder.Services.AddInfrastructure(builder.Configuration, builder.Environment.IsDevelopment());

builder.Services.AddSingleton(builder.Configuration.GetRequiredSection("AdminUser").Get<AdminUserOptions>()!);
builder.Services.AddScoped<AdminUserSeeder>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.MapOpenApi();

app.MapScalarApiReference(options =>
{
    options.WithTheme(ScalarTheme.Laserwave);
});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapUserEndpoints();
app.MapImageEndpoints();
app.MapRequestEndpoints();

using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.Migrate();
    await scope.ServiceProvider.GetRequiredService<AdminUserSeeder>().SeedAsync();
}

app.Run();