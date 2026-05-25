using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskHero.Domain.Images;
using TaskHero.Domain.Users;

namespace TaskHero.Infrastructure.Data.Configuration;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.EmailAddress)
            .IsRequired();

        builder.HasIndex(x => x.EmailAddress)
            .IsUnique();

        builder.HasIndex(x => x.Nickname)
            .IsUnique();

        builder.Property(x => x.Nickname)
            .IsRequired();

        builder.Property(x => x.IsAdmin)
            .IsRequired()
            .HasDefaultValue(false);

        builder.OwnsOne(x => x.Password);

        builder.HasMany<Image>()
            .WithOne()
            .HasForeignKey(x => x.UploaderId);
    }
}