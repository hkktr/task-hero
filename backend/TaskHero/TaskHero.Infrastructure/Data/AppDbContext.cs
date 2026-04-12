using Microsoft.EntityFrameworkCore;
using TaskHero.Domain.Images;
using TaskHero.Domain.Users;

namespace TaskHero.Infrastructure.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; private set; } = null!;
    public DbSet<Image> Images { get; private set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}