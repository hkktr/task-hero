using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using TaskHero.Api.Features.Users;
using TaskHero.Infrastructure;
using TaskHero.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddValidation();
builder.Services.AddOpenApi();
builder.Services.AddInfrastructure(builder.Configuration, builder.Environment.IsDevelopment());

var app = builder.Build();

// Configure the HTTP request pipeline.

app.MapOpenApi();

app.MapScalarApiReference(options =>
{
    options.WithTheme(ScalarTheme.Laserwave);
});

app.UseHttpsRedirection();

app.MapUserEndpoints();

using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.Migrate();
}

app.Run();