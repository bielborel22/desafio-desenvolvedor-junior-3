export default {
  roots: ["<rootDir>/src"],
  transform: {
    ".+\\.ts$": "@swc/jest",
  },
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
};
