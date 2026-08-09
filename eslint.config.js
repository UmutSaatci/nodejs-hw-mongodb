import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // Node.js yerleşik değişkenlerini (process vb.) tanır
      },
    },
    rules: {
      "no-unused-vars": "warn", // Kullanılmayan değişkenlerde uyarı verir
      "no-console": "off", // console.log kullanımına izin verir
      eqeqeq: "error", // === ve !== kullanımını zorunlu kılar
    },
  },
];
