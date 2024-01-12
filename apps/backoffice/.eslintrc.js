module.exports = {
  extends: ["@repo/eslint-config/next.js"],
  settings: {
    "import/resolver": {
      "alias": {
        "map": [
          ["@components", "./components/*"],
        ],
        "extensions": [".ts", ".tsx"]
      }
    }
  }
};
