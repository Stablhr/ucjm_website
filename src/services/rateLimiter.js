const rateLimitStore = new Map();

export function checkRateLimit(key, maxAttempts = 5, windowMs = 900000) {
  const now = Date.now();
  const record = rateLimitStore.get(key) || { attempts: 0, resetTime: now + windowMs };

  if (now > record.resetTime) {
    record.attempts = 0;
    record.resetTime = now + windowMs;
  }

  record.attempts++;
  rateLimitStore.set(key, record);

  return {
    allowed: record.attempts <= maxAttempts,
    remaining: Math.max(0, maxAttempts - record.attempts),
    resetTime: record.resetTime
  };
}

export function getRateLimitKey(identifier, action) {
  return `${identifier}:${action}`;
}

export function clearRateLimit(key) {
  rateLimitStore.delete(key);
}

if (typeof window !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 60000);
}
