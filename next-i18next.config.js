/** @type {import('next-i18next').UserConfig} */
const path = require("path");

// Locales advertised to next-i18next. Static export emits HTML in
// defaultLocale only; the others load client-side via the translation
// bundles under /locales/<lng>/.
module.exports = {
  debug: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: "en",
    locales: [
      "af", "ar", "bg", "bn", "de", "en", "eo", "es", "fa", "fr",
      "he", "hr", "it", "ja", "ko", "nl", "pt", "ru", "sk", "sl",
      "sv", "sw", "tr", "uk", "zh",
    ],
    reloadOnPrerender: process.env.NODE_ENV === "development",
  },
  localePath: path.resolve("./public/locales"),
};
