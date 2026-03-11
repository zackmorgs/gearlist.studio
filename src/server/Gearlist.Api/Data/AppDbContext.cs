using Gearlist.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Gearlist.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.HasIndex(u => u.Email).IsUnique();
            entity.Property(u => u.DisplayName).HasMaxLength(80).IsRequired();
            entity.Property(u => u.Email).HasMaxLength(256).IsRequired();
            entity.Property(u => u.PasswordHash).IsRequired();
            entity.Property(u => u.CreatedAtUtc).IsRequired();
        });
    }
}