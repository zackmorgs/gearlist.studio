using Models;
namespace Data.BandRoles;

public interface IBandRoleRepository
{
    Task EnsureIndexesAsync(CancellationToken ct = default);
    Task UpsertManyAsync(IEnumerable<BandRole> roles, CancellationToken ct = default);
}