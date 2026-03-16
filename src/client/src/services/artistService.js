const BASE = "/api/artists";

/**
 * GET /api/artists
 * @returns {Artist[]}
 */
export async function getArtists() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch artists.");
  return res.json();
}

/**
 * GET /api/artists/four-random
 * @returns {Artist[]}
 */
export async function getFourRandomArtists() {
  const res = await fetch(`${BASE}/four-random`);
  if (!res.ok) throw new Error("Failed to fetch random artists.");
  return res.json();
}

/**
 * GET /api/artists/:id
 * @param {string} id
 * @returns {Artist}
 */
export async function getArtist(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (res.status === 404) throw new Error("Artist not found.");
  if (!res.ok) throw new Error("Failed to fetch artist.");
  return res.json();
}

export async function getArtistByGenreSlug(genreSlug) {
  const res = await fetch(`${BASE}/genre/${genreSlug}`);
  if (res.status === 404) throw new Error("Artists not found.");
  if (!res.ok) throw new Error("Failed to fetch artists.");
  return res.json();
}

/**
 * GET /api/artists/slug/:slug
 * @param {string} slug
 * @returns {Artist}
 */
export async function getArtistBySlug(slug) {
  const res = await fetch(`${BASE}/slug/${slug}`);
  if (res.status === 404) throw new Error("Artist not found.");
  if (!res.ok) throw new Error("Failed to fetch artist.");
  return res.json();
}

/**
 * POST /api/artists
 * @param {Partial<Artist>} artist
 * @returns {Artist}
 */
export async function createArtist(artist) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(artist),
  });
  if (!res.ok) throw new Error("Failed to create artist.");
  return res.json();
}

/**
 * PUT /api/artists/:id
 * @param {string} id
 * @param {Partial<Artist>} artist
 * @returns {Artist}
 */
export async function updateArtist(id, artist) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(artist),
  });
  if (res.status === 404) throw new Error("Artist not found.");
  if (!res.ok) throw new Error("Failed to update artist.");
  return res.json();
}

/**
 * DELETE /api/artists/:id
 * @param {string} id
 */
export async function deleteArtist(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (res.status === 404) throw new Error("Artist not found.");
  if (!res.ok) throw new Error("Failed to delete artist.");
}
