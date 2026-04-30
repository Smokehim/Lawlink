export function getApiBase() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
}

export function getAdminApiBase() {
  return process.env.NEXT_PUBLIC_ADMIN_API_URL || getApiBase();
}

type ApiOptions = RequestInit & {
  authToken?: string | null;
};

export async function apiFetch<T = unknown>(path: string, options: ApiOptions = {}): Promise<T> {
  const url = `${getApiBase()}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  if (options.authToken) {
    headers["Authorization"] = `Bearer ${options.authToken}`;
  }

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = (data && (data.message as string)) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data as T;
}

export async function adminApiFetch<T = unknown>(path: string, options: ApiOptions = {}): Promise<T> {
  const url = `${getAdminApiBase()}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  if (options.authToken) {
    headers["Authorization"] = `Bearer ${options.authToken}`;
  }
  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = (data && (data.message as string)) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data as T;
}
