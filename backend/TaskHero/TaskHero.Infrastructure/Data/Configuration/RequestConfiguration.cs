using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskHero.Domain.Requests;

namespace TaskHero.Infrastructure.Data.Configuration;

public class RequestConfiguration : IEntityTypeConfiguration<Request>
{
    public void Configure(EntityTypeBuilder<Request> builder)
    {
        builder.ToTable("Requests");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(x => x.Type)
            .IsRequired();
            
        builder.Property(x => x.Description)
            .IsRequired()
            .HasMaxLength(2000);

        builder.OwnsOne(x => x.RequestDateTime);

        builder.Property(x => x.NumberOfVolunteers)
            .IsRequired();

        builder.HasMany(x => x.Images)
            .WithOne();

        builder.OwnsOne(x => x.Location);

        builder.Navigation(x => x.Images)
            .HasField("_images");

        builder.HasOne(x => x.RequestedBy)
            .WithMany();
    }
}