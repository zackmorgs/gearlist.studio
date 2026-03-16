const BASE = "/api/cabs";

/**
 * GET /api/cabs
 * @returns {Cab[]}
 */
export async function getCabs() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch cabs.");
  return res.json();
}

/**
 * GET /api/cabs/four-random
 * @returns {Cab[]}
 */
export async function getFourRandomCabs() {
  const res = await fetch(`${BASE}/four-random`);
  if (!res.ok) throw new Error("Failed to fetch random cabs.");
  return res.json();
}

/**
 * GET /api/cabs/:id
 * @param {string} id
 * @returns {Cab}
 */
export async function getCab(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (res.status === 404) throw new Error("Cab not found.");
  if (!res.ok) throw new Error("Failed to fetch cab.");
  return res.json();
}

/**
 * GET /api/cabs/slug/:slug
 * @param {string} slug
 * @returns {Cab}
 */
export async function getCabBySlug(slug) {
  const res = await fetch(`${BASE}/slug/${slug}`);
  if (res.status === 404) throw new Error("Cab not found.");
  if (!res.ok) throw new Error("Failed to fetch cab.");
  return res.json();
}

/**
 * POST /api/cabs
 * @param {Partial<Cab>} cab
 * @returns {Cab}
 */
export async function createCab(cab) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cab),
  });
  if (!res.ok) throw new Error("Failed to create cab.");
  return res.json();
}

/**
 * PUT /api/cabs/:id
 * @param {string} id
 * @param {Partial<Cab>} cab
 * @returns {Cab}
 */
export async function updateCab(id, cab) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cab),
  });
  if (res.status === 404) throw new Error("Cab not found.");
  if (!res.ok) throw new Error("Failed to update cab.");
  return res.json();
}

/**
 * DELETE /api/cabs/:id
 * @param {string} id
 */
export async function deleteCab(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (res.status === 404) throw new Error("Cab not found.");
  if (!res.ok) throw new Error("Failed to delete cab.");
}
