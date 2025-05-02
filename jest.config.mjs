export default {
  testEnvironment: "node",
  // extensionsToTreatAsEsm: [".js"],
  transform: {}, // prevents Jest from forcing CommonJS
  moduleNameMapper: {
    // optional: mock CSS, static imports etc.
  },
};
