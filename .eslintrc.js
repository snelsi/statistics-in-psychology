module.exports = {
  extends: ["alloy", "alloy/react", "alloy/typescript"],
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
  },
};
