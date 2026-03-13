using Models;
using MongoDB.Driver;
using Slugify;

namespace Data.Seeding;

public static class RoleSeeder
{
    private static readonly string[] RoleDisplayNames =
    [
        "Music Producers",
        "Guitarists",
        "Drummers",
        "Bassists",
        "DJs",
        "Rappers",
        "Composers",
        "Keyboardists",
        "Singers",
        "Podcasters & Streamers",
        "Ukulele Players",
        "Audio Engineers",
        "Saxophonists",
        "Trumpeters",
        "Harpists",
        "Trombonists",
        "Violinists",
        "Photographers",
        "Filmmakers"
    ];

    public static async Task SeedRolesAsync(Db db, CancellationToken ct = default)
    {
        var slugHelper = new SlugHelper();

        var existingSlugs = await db.BandRoles
            .Find(_ => true)
            .Project(r => r.Slug)
            .ToListAsync(ct);
        var existingSlugsSet = existingSlugs.ToHashSet();

        var now = DateTime.UtcNow;
        var toAdd = RoleDisplayNames
            .Select(name => new { Name = name, Slug = slugHelper.GenerateSlug(name) })
            .Where(x => !existingSlugsSet.Contains(new Models.Slug(x.Slug)))
            .Select(x => new BandRole
            {
                DisplayName = x.Name,
                Slug = new Models.Slug(x.Slug),
                CreatedAtUtc = now,
                UpdatedAtUtc = now
            })
            .ToList();

        if (toAdd.Count == 0) return;

        await db.BandRoles.InsertManyAsync(toAdd, cancellationToken: ct);
    }
}