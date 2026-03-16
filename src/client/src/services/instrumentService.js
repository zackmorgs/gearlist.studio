const BASE = "/api/instruments";

/**
 * GET /api/instruments
 * @returns {Instrument[]}
 */
export async function getInstruments() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch instruments.");
  return res.json();
}

/**
 * GET /api/instruments/four-random
 * @returns {Instrument[]}
 */
export async function getFourRandomInstruments() {
  const res = await fetch(`${BASE}/four-random`);
  if (!res.ok) throw new Error("Failed to fetch random instruments.");
  return res.json();
}

/**
 * GET /api/instruments/:id
 * @param {string} id
 * @returns {Instrument}
 */
export async function getInstrument(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (res.status === 404) throw new Error("Instrument not found.");
  if (!res.ok) throw new Error("Failed to fetch instrument.");
  return res.json();
}

/**
 * GET /api/instruments/slug/:slug
 * @param {string} slug
 * @returns {Instrument}
 */
export async function getInstrumentBySlug(slug) {
  const res = await fetch(`${BASE}/slug/${slug}`);
  if (res.status === 404) throw new Error("Instrument not found.");
  if (!res.ok) throw new Error("Failed to fetch instrument.");
  return res.json();
}

/**
 * POST /api/instruments
 * @param {Partial<Instrument>} instrument
 * @returns {Instrument}
 */
export async function createInstrument(instrument) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(instrument),
  });
  if (!res.ok) throw new Error("Failed to create instrument.");
  return res.json();
}

/**
 * PUT /api/instruments/:id
 * @param {string} id
 * @param {Partial<Instrument>} instrument
 * @returns {Instrument}
 */
export async function updateInstrument(id, instrument) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(instrument),
  });
  if (res.status === 404) throw new Error("Instrument not found.");
  if (!res.ok) throw new Error("Failed to update instrument.");
  return res.json();
}

/**
 * DELETE /api/instruments/:id
 * @param {string} id
 */
export async function deleteInstrument(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (res.status === 404) throw new Error("Instrument not found.");
  if (!res.ok) throw new Error("Failed to delete instrument.");
}
