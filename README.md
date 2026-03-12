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
