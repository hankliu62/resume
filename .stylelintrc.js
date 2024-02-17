module.exports = {
  processors: [],
  plugins: [],
  extends: [
    "stylelint-config-standard",
    "stylelint-order",
    "stylelint-config-recess-order",
  ],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind"],
      },
    ],
    "import-notation": "off",
  }, // 可以自己自定一些规则
};
