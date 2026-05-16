type CacheEntry = {
  value: any;
  expires: number;
};

const cache = new Map<string, CacheEntry>();

export function getCache(key: string) {
  const entry = cache.get(key);

  if (!entry) return null;

  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }

  return entry.value;
}

export function setCache(key: string, value: any, ttl = 1000 * 60 * 10) {
  cache.set(key, {
    value,
    expires: Date.now() + ttl,
  });
}
