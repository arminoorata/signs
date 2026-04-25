import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // The "load from localStorage once on mount" pattern necessarily
      // calls setState inside useEffect. The rule is too strict for this
      // common SSR-safe initial-load case. We do not have cascading renders.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
