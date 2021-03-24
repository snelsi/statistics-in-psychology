module.exports = {
  extends: ["alloy", "alloy/react", "alloy/typescript", "plugin:react-hooks/recommended"],
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "useRecoilCallback",
      },
    ],
  },
};
