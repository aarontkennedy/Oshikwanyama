module.exports = {
  preset: "jest-expo",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transformIgnorePatterns: [
    "node_modules/(?!@react-native|react-native|expo-modules-core|expo|@react-navigation|expo-router|expo-linking|@unimodules|unimodules-core)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/kwanyama_archived/",
    "/components/oshikwanyama/legacy/",
  ],
};
