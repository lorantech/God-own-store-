// Empty = same-origin (works with Vercel routing and Next.js dev rewrites).
// Set NEXT_PUBLIC_API_URL (e.g. http://localhost:5000) only when calling the backend directly.
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

async function request(endpoint: string, method: string, data?: any, token?: string) {
  const headers: Record<string, string> = {};
  if (data !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = 'Bearer ' + token;
  let res: Response;
  try {
    res = await fetch(API_BASE + endpoint, {
      method,
      headers,
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
  } catch (e: any) {
    const err: any = new Error('Cannot reach server. Make sure the backend is running and /api is reachable.');
    err.status = 0;
    err.cause = e;
    throw err;
  }
  let json: any = null;
  try {
    json = await res.json();
  } catch {}
  if (!res.ok) {
    const err: any = new Error(json?.message || `API request failed (${res.status})`);
    err.status = res.status;
    err.data = json;
    throw err;
  }
  return json;
}

export const api = {
  get: async (endpoint: string, token?: string) => request(endpoint, 'GET', undefined, token),
  post: async (endpoint: string, data: any, token?: string) => request(endpoint, 'POST', data, token),
  put: async (endpoint: string, data: any, token?: string) => request(endpoint, 'PUT', data, token),
  delete: async (endpoint: string, token?: string) => request(endpoint, 'DELETE', undefined, token),
};
