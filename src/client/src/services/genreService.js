const BASE = "/api/genres";

/**
 * GET /api/genres
 * @returns {Genre[]}
 */
export async function getGenres() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch genres.");
  return res.json();
}

/**
 * GET /api/genres/:id
 * @param {string} id
 * @returns {Genre}
 */
export async function getGenre(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (res.status === 404) throw new Error("Genre not found.");
  if (!res.ok) throw new Error("Failed to fetch genre.");
  return res.json();
}

/**
 * GET /api/genres/slug/:slug
 * @param {string} slug
 * @returns {Genre}
 */
export async function getGenreBySlug(slug) {
  const res = await fetch(`${BASE}/slug/${slug}`);
  if (res.status === 404) throw new Error("Genre not found.");
  if (!res.ok) throw new Error("Failed to fetch genre.");
  return res.json();
}

/**
 * POST /api/genres
 * @param {Partial<Genre>} genre
 * @returns {Genre}
 */
export async function createGenre(genre) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(genre),
  });
  if (!res.ok) throw new Error("Failed to create genre.");
  return res.json();
}

/**
 * PUT /api/genres/:id
 * @param {string} id
 * @param {Partial<Genre>} genre
 * @returns {Genre}
 */
export async function updateGenre(id, genre) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(genre),
  });
  if (res.status === 404) throw new Error("Genre not found.");
  if (!res.ok) throw new Error("Failed to update genre.");
  return res.json();
}

/**
 * DELETE /api/genres/:id
 * @param {string} id
 */
export async function deleteGenre(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (res.status === 404) throw new Error("Genre not found.");
  if (!res.ok) throw new Error("Failed to delete genre.");
}
