using Data.BandRoles;
using Models;
using Slugify;

namespace Data.Seeding;

public sealed class BandRoleSeedHostedService : IHostedService
{
    private readonly IBandRoleRepository _roles;

    private static readonly string[] RoleDisplayNames =
    [
        "Music Producers",
        "Guitarists",
        "Drummers",
        "Bassists",
        "Rappers",
        "Composers",
        "Keyboardists",
        "Singers",
        "Ukulele Players",
        "Audio Engineers",
        "Saxophonists",
        "Trumpeters",
        "Harpists",
        "Trombonists",
        "Violinists"
    ];

    public BandRoleSeedHostedService(IBandRoleRepository roles)
    {
        _roles = roles;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await _roles.EnsureIndexesAsync(cancellationToken);

        var slug = new SlugHelper();
        var now = DateTime.UtcNow;

        var docs = RoleDisplayNames.Select(name => new BandRole
        {
            DisplayName = name,
            Slug = slug.GenerateSlug(name),
            CreatedAtUtc = now,
            UpdatedAtUtc = now
        });

        await _roles.UpsertManyAsync(docs, cancellationToken);
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}