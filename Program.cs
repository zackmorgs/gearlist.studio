using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var spaRoot = Path.GetFullPath(Path.Combine(app.Environment.ContentRootPath, "src/server/Host/wwwroot"));
Directory.CreateDirectory(spaRoot);

var spaFiles = new PhysicalFileProvider(spaRoot);

app.UseHttpsRedirection();
app.UseDefaultFiles(new DefaultFilesOptions
{
    FileProvider = spaFiles
});
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = spaFiles
});

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.MapFallback(async context =>
{
    var indexFilePath = Path.Combine(spaRoot, "index.html");

    if (!File.Exists(indexFilePath))
    {
        context.Response.StatusCode = StatusCodes.Status404NotFound;
        await context.Response.WriteAsync("SPA index file not found. Rebuild the client.");
        return;
    }

    context.Response.ContentType = "text/html; charset=utf-8";
    await context.Response.SendFileAsync(indexFilePath);
});
                            
app.Run();
