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
          {
            target: "./src/features/api",
            from: "./src/forms",
            message: "Forms must not access API layer",
          },
          {
            target: "./src/features/api",
            from: "./src/context",
            message: "Context must be the API boundary",
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
      UI IMPORT CONVETNTIONS 
    ========================= */
    "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/*Request*"],
              message:
                "UI and Context must not import *Request types. Translate Args → Request inside the context.",
            },
          ],
        },
      ],

    /* =========================
      NAMING CONVENTIONS 
    ========================= */
    "@typescript-eslint/naming-convention": [
      "error",

      // Interfaces
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "(Args|Request|Response|ContextValue|User)$",
          match: true,
        },
      },

      // Type aliases
      {
        selector: "typeAlias",
        format: ["PascalCase"],
        custom: {
          regex: "(Args|Request|Response)$",
          match: true,
        },
      },
    ],
    /* ======================
     AUTHMESSAGE TYPE ENUM ENFORCEMENT
    ======================== */
    "@typescript-eslint/no-restricted-types": [
      "error",
      {
        types: {
          string: {
            message:
              "Do not use `string` for auth message types. Use AuthMessageType instead.",
          },
        },
      },
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
  overrides: [
    {
      files: ["src/features/api/services/**/*.{ts,tsx}"],
      rules: {
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "parameter",
            format: ["camelCase"],
            custom: {
              regex: "Request$",
              match: true,
            },
          },
        ],
      },
    },
    {
      files: ["src/context/**/*.{ts,tsx}"],
      rules: {
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "parameter",
            format: ["camelCase"],
            custom: {
              regex: "Args$",
              match: true,
            },
          },
        ],
      },
    },
    {
      files: ["src/**/AuthContext*.{ts,tsx}"],
      rules: {
        "@typescript-eslint/no-restricted-types": [
          "error",
          {
            types: {
              string: {
                message:
                  "Auth message `type` must use AuthMessageType union.",
              },
            },
          },
        ],
      },
    },

  ],

  settings: {
    react: {
      version: "detect",
    },
  },
};