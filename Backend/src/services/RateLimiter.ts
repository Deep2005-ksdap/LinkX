type bucket = {
  token: number;
  lastRefill: number;
};

export class RateLimiter {
  private buckets = new Map<string, bucket>();

  constructor(
    private capacity: number,
    private refillRate: number, // tokens per second
  ) {}

  allowReq(key: string): boolean {
    const now = Date.now();

    let bucket = this.buckets.get(key);
    if (!bucket) {
      bucket = { token: this.capacity, lastRefill: now };
    }

    const elapsed = (now - bucket.lastRefill) / 1000;
    const refillTokens = Math.floor(elapsed * this.refillRate);

    bucket.token = Math.min(this.capacity, bucket.token + refillTokens);
    bucket.lastRefill = now;

    if (bucket.token > 0) {
      bucket.token--;
      this.buckets.set(key, bucket);
      return true;
    }

    this.buckets.set(key, bucket);
    return false;
  }
}
