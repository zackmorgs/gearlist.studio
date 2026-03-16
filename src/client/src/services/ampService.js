const BASE = "/api/amps";

/**
 * GET /api/amps
 * @returns {Amp[]}
 */
export async function getAmps() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch amps.");
  return res.json();
}

/**
 * GET /api/amps/four-random
 * @returns {Amp[]}
 */
export async function getFourRandomAmps() {
  const res = await fetch(`${BASE}/four-random`);
  if (!res.ok) throw new Error("Failed to fetch random amps.");
  return res.json();
}

/**
 * GET /api/amps/:id
 * @param {string} id
 * @returns {Amp}
 */
export async function getAmp(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (res.status === 404) throw new Error("Amp not found.");
  if (!res.ok) throw new Error("Failed to fetch amp.");
  return res.json();
}

/**
 * GET /api/amps/slug/:slug
 * @param {string} slug
 * @returns {Amp}
 */
export async function getAmpBySlug(slug) {
  const res = await fetch(`${BASE}/slug/${slug}`);
  if (res.status === 404) throw new Error("Amp not found.");
  if (!res.ok) throw new Error("Failed to fetch amp.");
  return res.json();
}

/**
 * POST /api/amps
 * @param {Partial<Amp>} amp
 * @returns {Amp}
 */
export async function createAmp(amp) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(amp),
  });
  if (!res.ok) throw new Error("Failed to create amp.");
  return res.json();
}

/**
 * PUT /api/amps/:id
 * @param {string} id
 * @param {Partial<Amp>} amp
 * @returns {Amp}
 */
export async function updateAmp(id, amp) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(amp),
  });
  if (res.status === 404) throw new Error("Amp not found.");
  if (!res.ok) throw new Error("Failed to update amp.");
  return res.json();
}

/**
 * DELETE /api/amps/:id
 * @param {string} id
 */
export async function deleteAmp(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (res.status === 404) throw new Error("Amp not found.");
  if (!res.ok) throw new Error("Failed to delete amp.");
}
