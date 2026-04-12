using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskHero.Domain.Images;

namespace TaskHero.Infrastructure.Data.Configuration;

public class ImageConfiguration : IEntityTypeConfiguration<Image>
{
    public void Configure(EntityTypeBuilder<Image> builder)
    {
        builder.ToTable("Images");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Filename)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(x => x.Uri)
            .IsRequired()
            .HasMaxLength(1000);

        builder.Property(x => x.UploaderId)
            .IsRequired();
    }
}