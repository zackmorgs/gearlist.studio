const BASE = "/api/auth";

/**
 * POST /api/auth/login
 * @param {string} email
 * @param {string} password
 * @returns {{ token: string, user: { id: string, displayName: string, email: string } }}
 */
export async function login(email, password) {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (res.status === 401) throw new Error("Invalid email or password.");
  if (!res.ok) throw new Error("Login failed. Please try again.");

  return res.json();
}

/**
 * POST /api/auth/register
 * @param {string} email
 * @param {string} password
 * @param {string} displayName
 * @returns {{ id: string, displayName: string, email: string }}
 */
export async function register(email, password, displayName) {
  const res = await fetch(`${BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, displayName }),
  });

  if (res.status === 409)
    throw new Error("An account with that email already exists.");
  if (!res.ok) throw new Error("Registration failed. Please try again.");

  return res.json();
}

/**
 * POST /api/auth/google
 * @param {string} idToken  Google credential JWT
 * @returns {{ token: string, user: { id: string, displayName: string, email: string } }}
 */
export async function loginWithGoogle(idToken) {
  const res = await fetch(`${BASE}/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (res.status === 401) throw new Error("Google authentication failed.");
  if (!res.ok) throw new Error("Google login failed. Please try again.");

  return res.json();
}

/**
 * GET /api/me
 * @param {string} token  JWT token
 * @returns {{ id: string, email: string, name: string }}
 */
export async function getMe(token) {
  const res = await fetch("/api/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) throw new Error("Unauthorized.");
  if (!res.ok) throw new Error("Failed to fetch user.");

  return res.json();
}
