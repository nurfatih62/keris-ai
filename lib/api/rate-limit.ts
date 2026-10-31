const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;
const MAX_ENTRIES = 5_000;

const requestLog = new Map<string, number[]>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function checkRateLimit(
  key: string,
  now: number = Date.now(),
  limit: number = MAX_REQUESTS,
  windowMs: number = WINDOW_MS,
): RateLimitResult {
  const cutoff = now - windowMs;
  const existing = requestLog.get(key) ?? [];
  const recent = existing.filter((timestamp) => timestamp > cutoff);

  if (recent.length >= limit) {
    const oldest = recent[0] ?? now;
    requestLog.set(key, recent);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  recent.push(now);
  requestLog.set(key, recent);

  if (requestLog.size > MAX_ENTRIES) {
    const firstKey = requestLog.keys().next().value;
    if (firstKey) requestLog.delete(firstKey);
  }

  return {
    allowed: true,
    remaining: Math.max(0, limit - recent.length),
    retryAfterSeconds: 0,
  };
}

export function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || request.headers.get("x-real-ip") || "lokal";
}

export function resetRateLimit(): void {
  requestLog.clear();
}
