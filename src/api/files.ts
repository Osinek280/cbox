import { isJwtValid } from "@/utils/jwt";
import { refreshTokenAPI } from "./auth";

const BASE_URL = "http://localhost:8081/api";

async function getValidAccessToken(): Promise<string> {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) throw new Error("Brak access tokena");

  if (!isJwtValid(accessToken)) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("Brak refresh tokena");

    const { newAccessToken, newRefreshToken } = await refreshTokenAPI(
      refreshToken
    );
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return newAccessToken;
  }

  return accessToken;
}

export async function filesApi() {
  const token = await getValidAccessToken();
  const res = await fetch(`${BASE_URL}/files`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();
  console.log("Login response data:", data);
  return data;
}
