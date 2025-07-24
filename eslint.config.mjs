import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1) pull in Next’s defaults:
  ...compat.extends("next/core-web-vitals"),

  // 2) then override/add your own rules:
  {
    rules: {
      // disable the “no unescaped entities” check in JSX:
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
