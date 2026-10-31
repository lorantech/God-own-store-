const API_BASE = '';

export const api = {
  get: async (endpoint: string) => {
    const res = await fetch(${API_BASE});
    if (!res.ok) throw new Error('API request failed');
    return res.json();
  },
  post: async (endpoint: string, data: any) => {
    const res = await fetch(${API_BASE}, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('API request failed');
    return res.json();
  },
  put: async (endpoint: string, data: any, token?: string) => {
    const res = await fetch(${API_BASE}, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': Bearer  })
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('API request failed');
    return res.json();
  },
  delete: async (endpoint: string, token?: string) => {
    const res = await fetch(${API_BASE}, {
      method: 'DELETE',
      headers: {
        ...(token && { 'Authorization': Bearer  })
      },
    });
    if (!res.ok) throw new Error('API request failed');
    return res.json();
  },
};
