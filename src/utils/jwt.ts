export function isJwtValid(token: string): boolean {
  if (!token) return false;

  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return false;

    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    if (!payload.exp) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch {
    return false;
  }
}
