const BASE = "/api/equipment";

/**
 * GET /api/equipment/search?q=term
 * Searches all equipment types (amps, cabs, pedals, plugins, instruments) by display name.
 * @param {string} query
 * @returns {{ id: string, displayName: string, imageUrl: string, type: string }[]}
 */
/**
 * POST /api/equipment/batch
 * Fetches multiple equipment items by GUID in a single request.
 * GUIDs that don't match any item are silently skipped.
 * @param {string[]} ids
 * @returns {{ id: string, displayName: string, imageUrl: string, type: string }[]}
 */
export async function batchGetEquipment(ids) {
  if (!ids || ids.length === 0) return [];
  const res = await fetch(`${BASE}/batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ids),
  });
  if (!res.ok) throw new Error("Failed to fetch equipment batch.");
  return res.json();
}

export async function searchEquipment(query) {
  if (!query || !query.trim()) return [];
  const res = await fetch(
    `${BASE}/search?q=${encodeURIComponent(query.trim())}`
  );
  if (!res.ok) throw new Error("Failed to search equipment.");
  return res.json();
}

/**
 * GET /api/equipment/:id
 * Finds a single piece of equipment across all types by GUID.
 * @param {string} id
 * @returns {{ id: string, displayName: string, imageUrl: string, type: string }}
 */
export async function getEquipmentByGuid(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (res.status === 404) throw new Error("Equipment not found.");
  if (!res.ok) throw new Error("Failed to fetch equipment.");
  return res.json();
}
