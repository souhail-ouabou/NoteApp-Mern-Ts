module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "js"],
  testTimeout: 30000,
  detectOpenHandles: true,
  forceExit: true,
};