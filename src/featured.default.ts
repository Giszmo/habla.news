// Default NIP-05 names and Featured authors shipped with the repo.
//
// To customize without diverging from upstream, create a sibling file
// `src/featured.local.ts` that exports `names` and/or `featured`. When
// present, the local file completely replaces this one at build time
// (see `next.config.js` webpack alias). An empty local file therefore
// renders an empty NIP-05 directory and no Featured authors.
//
// The minimal default keeps Featured working out-of-the-box and lets
// the curated handles below resolve via /<handle>/<slug> URLs.

export const names: Record<string, string> = {
  _: "7d4e04503ab26615dd5f29ec08b52943cbe5f17bacc3012b26220caa232ab14c",
  jack: "82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2",
  rabble: "76c71aae3a491f1d9eec47cba17e229cda4113a0bbb6e6ae1776d7643e29cafa",
  fiatjaf: "3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d",
  opensats: "787338757fc25d65cd929394d5e7713cf43638e8d259e8dcf5c73b834eb851f2",
  dergigi: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
  guyswann: "b9e76546ba06456ed301d9e52bc49fa48e70a6bf2282be7a1ae72947612023dc",
  karnage: "1bc70a0148b3f316da33fe3c89f23e3e71ac4ff998027ec712b905cd24f6a411",
  tony: "7f5c2b4e48a0e9feca63a46b13cdb82489f4020398d60a2070a968caa818d75d",
  moon: "5df413d4c5e5035ff508fd99b38b21ea9a0ac0b9ecc34f3312aba9aa2add4f5b",
  nostreport: "2edbcea694d164629854a52583458fd6d965b161e3c48b57d3aff01940558884",
  getalby: "4657dfe8965be8980a93072bcfb5e59a65124406db0f819215ee78ba47934b3e",
  verbiricha: "7fa56f5d6962ab1e3cd424e758c3002b8665f7b0d8dcee9fe9e288d7751ac194",
};

export const featured: string[] = [
  "jack",
  "rabble",
  "fiatjaf",
  "opensats",
  "dergigi",
  "guyswann",
  "karnage",
  "tony",
  "moon",
  "nostreport",
  "getalby",
  "verbiricha",
];
