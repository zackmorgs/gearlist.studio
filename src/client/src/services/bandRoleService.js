const BASE = "/api/bandroles";

/**
 * GET /api/bandroles
 * @returns {BandRole[]}
 */
export async function getBandRoles() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch band roles.");
  return res.json();
}

/**
 * GET /api/bandroles/:id
 * @param {string} id
 * @returns {BandRole}
 */
export async function getBandRole(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (res.status === 404) throw new Error("Band role not found.");
  if (!res.ok) throw new Error("Failed to fetch band role.");
  return res.json();
}

/**
 * GET /api/bandroles/slug/:slug
 * @param {string} slug
 * @returns {BandRole}
 */
export async function getBandRoleBySlug(slug) {
  const res = await fetch(`${BASE}/slug/${slug}`);
  if (res.status === 404) throw new Error("Band role not found.");
  if (!res.ok) throw new Error("Failed to fetch band role.");
  return res.json();
}

/**
 * POST /api/bandroles
 * @param {Partial<BandRole>} role
 * @returns {BandRole}
 */
export async function createBandRole(role) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(role),
  });
  if (!res.ok) throw new Error("Failed to create band role.");
  return res.json();
}

/**
 * PUT /api/bandroles/:id
 * @param {string} id
 * @param {Partial<BandRole>} role
 * @returns {BandRole}
 */
export async function updateBandRole(id, role) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(role),
  });
  if (res.status === 404) throw new Error("Band role not found.");
  if (!res.ok) throw new Error("Failed to update band role.");
  return res.json();
}

/**
 * DELETE /api/bandroles/:id
 * @param {string} id
 */
export async function deleteBandRole(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (res.status === 404) throw new Error("Band role not found.");
  if (!res.ok) throw new Error("Failed to delete band role.");
}
