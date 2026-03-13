# gearlist.studio

A website for musicians to find the gear that their favorite musicians use.

# Technology

- Ubuntu Server
- C# .NET 10 MVC REST Backend
  - Entity Framework Core
  - Microsoft Authentication JwtBearer
  - BCrypt encrypted - use for passwords
  - LettuceEncrypt for `https://`
- SPA frontend
  - React
    - Bundled with `esbuild`
  - CSS
    - SCSS
    - PostCSS
      - Autoprefixer

## `dev` the project

Run both watchers from project root:

```bash
npm run dev
# or
bash ./scripts/dev.sh
```

This starts:

- client watch pipeline writing to `src/server/Host/wwwroot`
- `dotnet watch run` for backend + browser refresh

If file watching is unreliable on your setup (VM/container/network mounts), run with polling:

```bash
npm run dev:poll
# or
DOTNET_USE_POLLING_FILE_WATCHER=1 bash ./scripts/dev.sh
```

## Bundle output

Create a complete client + server bundle in `./dist` with:

```bash
bash ./scripts/bundle.sh
```

Resulting structure:

- `dist/client` (SPA build output)
- `dist/server/Api` (published API)
- `dist/server/Host` (published Host)

The bundler also copies `dist/client` into `dist/server/Host/wwwroot` so Host can serve the SPA directly.

# TODO

1. Lock model shape
   Add required fields + max lengths (DisplayName, Slug, etc.).
   Add base fields consistently (Id, CreatedAtUtc, UpdatedAtUtc).
   Decide inheritance strategy for Equipment (TPH is simplest).

2. Add relationships explicitly
   User ↔ Role (many-to-many via UserRole or simple FK if one role/user).
   Artist/Band ↔ Equipment (likely many-to-many).
   Add join entities now to avoid migration pain later.

3. Configure EF Core in AppDbContext
   DbSet<> for each model.
   IEntityTypeConfiguration<T> per entity (cleaner than giant OnModelCreating).
   Set:
   required/optional
   lengths
   indexes
   delete behavior

4. Add constraints/indexes
   Unique: Role.Slug, User.Email, any public slug fields.
   Index common filters (Slug, CreatedAtUtc, foreign keys).

5. Seed reference data
   Keep your role seeder idempotent (slug-based).
   Seed genres similarly if they’re fixed.

6. Add DTO boundaries
   Keep API DTOs separate from entities.
   Never bind EF entities directly from requests.

7. Add repository/service layer (lightweight)
   At minimum: query services for roles, users, equipment.
   Keep controllers thin.

8. Migrations + validation
   Create migration, apply, then verify:
   duplicates blocked
   cascade rules correct
   seeding reruns safely

9. Add tests
   Seeder idempotency test.
   Relationship integrity tests.
   Unique index violation tests.
