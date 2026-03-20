# gearlist.studio

A website for musicians to find the gear that their favorite musicians use.

[Video Demo](https://youtu.be/6cGLbDS4-s0)

<div style="display:flex; flex-direction: row;">
  <img src="https://github.com/zackmorgs/gearlist.studio/blob/main/design/gearlist.studio-1.png?raw=true" alt="Screenshot 1" width="375"/>

  <img src="https://github.com/zackmorgs/gearlist.studio/blob/main/design/gearlist.studio-2.png?raw=true" alt="Screenshot 2" width="375"/>

  <img src="https://github.com/zackmorgs/gearlist.studio/blob/main/design/gearlist.studio-3.png?raw=true" alt="Screenshot 3" width="375"/>

  <img src="https://github.com/zackmorgs/gearlist.studio/blob/main/design/gearlist.studio-4.png?raw=true" alt="Screenshot 4" width="375"/>
</div>

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

## Getting Started

1. Install dependencies

```
npm run setup
```

2. Run the project

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

## To do

- Auth
  - Roles
  - Attach changes data to each user
- UI
  - Responsive design
    - made mobile first - needs tablet, desktop1
  - Admin panel
- Stretch goals
  - ChatGPT moderator
    - moderates the content of the site so i dont have to
