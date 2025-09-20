import { useAuth } from "../context/AuthContext";

export async function fetchWithAuth(url: string, options: RequestInit, token: string, setSessionExpired: (v: boolean) => void) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `${token}`,
    },
  });

  if (response.status === 401) {
    setSessionExpired(true);
    throw new Error("Token expirado");
  }

  return response;
}