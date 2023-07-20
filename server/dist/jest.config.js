"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    roots: ["<rootDir>/src"],
    transform: {
        ".+\\.ts$": "@swc/jest",
    },
    testMatch: ["**/*.test.ts", "**/*.spec.ts"],
};
