![Screenshot 1](https://github.com/zackmorgs/gearlist.studio/blob/main/design/gearlist.studio-1.png?raw=true)

![Screenshot 2](https://github.com/zackmorgs/gearlist.studio/blob/main/design/gearlist.studio-2.png?raw=true)

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

```
