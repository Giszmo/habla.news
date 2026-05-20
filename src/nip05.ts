import { names, featured } from "@habla-featured";

export { names, featured };

export const featuredPubkeys = featured.map(getPubkey);

const pubkeyToHandle = Object.entries(names).reduce((acc, item) => {
  const [k, v] = item;
  return { ...acc, [v]: k };
}, {});

export function getHandles() {
  return Object.keys(names).filter((h) => h !== "_");
}

export function getPubkey(handle) {
  return names[handle.toLowerCase()];
}

export function getHandle(pubkey) {
  return pubkeyToHandle[pubkey];
}
