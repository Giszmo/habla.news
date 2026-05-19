import NDKCacheAdapterDexie from "@nostr-dev-kit/ndk-cache-dexie";

const adapter = new NDKCacheAdapterDexie({
  dbName: "nostr",
  expirationTime: 3600 * 24 * 7,
  profileCacheSize: 200,
});

// NDK 2.12 only calls loadFromRelays() after the cache if locking===true; the
// Dexie adapter sets it true post-warmup, so early subscriptions race and get
// stuck with cache-only results. Force it true up-front; query() awaits warmup
// internally.
(adapter as any).locking = true;

export default adapter;
