const BASE = "/api/bands";

/**
 * GET /api/bands
 * @returns {Band[]}
 */
export async function getBands() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch bands.");
  return res.json();
}

/**
 * GET /api/bands/four-random
 * @returns {Band[]}
 */
export async function getFourRandomBands() {
  const res = await fetch(`${BASE}/four-random`);
  if (!res.ok) throw new Error("Failed to fetch random bands.");
  return res.json();
}

/**
 * GET /api/bands/:slug
 * @param {string} slug
 * @returns {Band}
 */
export async function getBand(slug) {
  const res = await fetch(`${BASE}/${slug}`);
  if (res.status === 404) throw new Error("Band not found.");
  if (!res.ok) throw new Error("Failed to fetch band.");
  return res.json();
}

/**
 * GET /api/bands/genre/:slug
 * @param {string} genreSlug
 * @returns {Band[]}
 */
export async function getBandsByGenreSlug(genreSlug) {
  const res = await fetch(`${BASE}/genre/${genreSlug}`);
  if (res.status === 404) throw new Error("Bands not found.");
  if (!res.ok) throw new Error("Failed to fetch bands.");
  return res.json();
}

/**
 * POST /api/bands
 * @param {Partial<Band>} band
 * @returns {Band}
 */
export async function createBand(band) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(band),
  });
  if (!res.ok) throw new Error("Failed to create band.");
  return res.json();
}

/**
 * PUT /api/bands/:id
 * @param {string} id
 * @param {Partial<Band>} band
 * @returns {Band}
 */
export async function updateBand(id, band) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(band),
  });
  if (res.status === 404) throw new Error("Band not found.");
  if (!res.ok) throw new Error("Failed to update band.");
  return res.json();
}

/**
 * DELETE /api/bands/:id
 * @param {string} id
 */
export async function deleteBand(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (res.status === 404) throw new Error("Band not found.");
  if (!res.ok) throw new Error("Failed to delete band.");
}
