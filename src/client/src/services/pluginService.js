const BASE = "/api/plugins";

/**
 * GET /api/plugins
 * @returns {Plugin[]}
 */
export async function getPlugins() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch plugins.");
  return res.json();
}

/**
 * GET /api/plugins/:id
 * @param {string} id
 * @returns {Plugin}
 */
export async function getPlugin(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (res.status === 404) throw new Error("Plugin not found.");
  if (!res.ok) throw new Error("Failed to fetch plugin.");
  return res.json();
}

/**
 * GET /api/plugins/slug/:slug
 * @param {string} slug
 * @returns {Plugin}
 */
export async function getPluginBySlug(slug) {
  const res = await fetch(`${BASE}/slug/${slug}`);
  if (res.status === 404) throw new Error("Plugin not found.");
  if (!res.ok) throw new Error("Failed to fetch plugin.");
  return res.json();
}

/**
 * POST /api/plugins
 * @param {Partial<Plugin>} plugin
 * @returns {Plugin}
 */
export async function createPlugin(plugin) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plugin),
  });
  if (!res.ok) throw new Error("Failed to create plugin.");
  return res.json();
}

/**
 * PUT /api/plugins/:id
 * @param {string} id
 * @param {Partial<Plugin>} plugin
 * @returns {Plugin}
 */
export async function updatePlugin(id, plugin) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plugin),
  });
  if (res.status === 404) throw new Error("Plugin not found.");
  if (!res.ok) throw new Error("Failed to update plugin.");
  return res.json();
}

/**
 * DELETE /api/plugins/:id
 * @param {string} id
 */
export async function deletePlugin(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (res.status === 404) throw new Error("Plugin not found.");
  if (!res.ok) throw new Error("Failed to delete plugin.");
}
