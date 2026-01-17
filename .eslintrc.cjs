/* eslint-env node */
module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  plugins: ["react", "react-hooks", "import", "@typescript-eslint"],

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],

  rules: {
    /* =========================
       CRITICAL BUG PREVENTION
    ========================= */
    "react-refresh/only-export-components": "off",

    // Prevent accidental recursion & shadowing
    "no-shadow": "error",
    "no-use-before-define": ["error", { functions: false }],

    // Prevent silent async failures
    "no-floating-promises": "off",
    "no-return-await": "error",

    // Enforce consistent function behavior
    "consistent-return": "error",

    /* =========================
       AUTH ARCHITECTURE GUARDS
    ========================= */

    // Contexts must not import API services incorrectly
    "import/no-cycle": "error",

    // Enforce naming conventions
    "import/no-named-as-default": "error",

    // 🚨 THIS IS #3 — GOES RIGHT HERE
    // Enforce Context ↔ API separation
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: "./src/features/api",
            from: "./src/contexts",
            message: "API services must not import Contexts",
          },
          {
            target: "./src/contexts",
            from: "./src/features/api",
            message: "Contexts must not import API services directly",
          },
        ],
      },
    ],
    "no-restricted-globals": [
        "error",
        {
            name: "requestPasswordReset",
            message: "Use requestPasswordResetApi for API calls"
        }
    ],

    /* =========================
       REACT SAFETY
    ========================= */

    "react/prop-types": "off", // using TS or not strict props
    "react/react-in-jsx-scope": "off",

    /* =========================
       QUALITY OF LIFE
    ========================= */

    "no-console": ["warn", { allow: ["warn", "error"] }],
    
  },

  settings: {
    react: {
      version: "detect",
    },
  },
};