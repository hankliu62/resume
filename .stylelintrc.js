const fabric = require('@hankliu/fabric');

module.exports = {
  ...fabric.stylelint,
  rules: {
    ...fabric.stylelint.rules,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind"],
      },
    ],
    "keyframes-name-pattern": null,
  }, // 可以自己自定一些规则
};
