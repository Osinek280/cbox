const BASE_URL = "http://localhost:8081/api/auth"; // <- zmień na swoje API

export async function loginAPI(
  email: string,
  password: string
): Promise<{ token: string; refreshToken: string }> {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();
  console.log("Login response data:", data);
  return data;
}

export async function registerAPI(
  email: string,
  password: string
): Promise<void> {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Register failed");
}

export async function refreshTokenAPI(refreshToken: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) throw new Error("Refresh token failed");
  const data = await res.json();
  return data.accessToken;
}
