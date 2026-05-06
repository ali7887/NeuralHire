const requests = new Map<string, { count: number; start: number }>();

export function rateLimit(ip: string, limit = 10, windowMs = 60000) {
  const now = Date.now();
  const data = requests.get(ip) || { count: 0, start: now };

  if (now - data.start > windowMs) {
    data.count = 0;
    data.start = now;
  }

  data.count++;
  requests.set(ip, data);

  return data.count <= limit;
}
