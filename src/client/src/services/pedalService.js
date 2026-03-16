const BASE = "/api/pedals";

/**
 * GET /api/pedals
 * @returns {Pedal[]}
 */
export async function getPedals() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch pedals.");
  return res.json();
}

/**
 * GET /api/pedals/four-random
 * @returns {Pedal[]}
 */
export async function getFourRandomPedals() {
  const res = await fetch(`${BASE}/four-random`);
  if (!res.ok) throw new Error("Failed to fetch random pedals.");
  return res.json();
}

/**
 * GET /api/pedals/:id
 * @param {string} id
 * @returns {Pedal}
 */
export async function getPedal(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (res.status === 404) throw new Error("Pedal not found.");
  if (!res.ok) throw new Error("Failed to fetch pedal.");
  return res.json();
}

/**
 * GET /api/pedals/slug/:slug
 * @param {string} slug
 * @returns {Pedal}
 */
export async function getPedalBySlug(slug) {
  const res = await fetch(`${BASE}/slug/${slug}`);
  if (res.status === 404) throw new Error("Pedal not found.");
  if (!res.ok) throw new Error("Failed to fetch pedal.");
  return res.json();
}

/**
 * POST /api/pedals
 * @param {Partial<Pedal>} pedal
 * @returns {Pedal}
 */
export async function createPedal(pedal) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedal),
  });
  if (!res.ok) throw new Error("Failed to create pedal.");
  return res.json();
}

/**
 * PUT /api/pedals/:id
 * @param {string} id
 * @param {Partial<Pedal>} pedal
 * @returns {Pedal}
 */
export async function updatePedal(id, pedal) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedal),
  });
  if (res.status === 404) throw new Error("Pedal not found.");
  if (!res.ok) throw new Error("Failed to update pedal.");
  return res.json();
}

/**
 * DELETE /api/pedals/:id
 * @param {string} id
 */
export async function deletePedal(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (res.status === 404) throw new Error("Pedal not found.");
  if (!res.ok) throw new Error("Failed to delete pedal.");
}
