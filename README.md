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
`dotnet watch run` from './'

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

