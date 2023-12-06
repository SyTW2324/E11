module.exports = {
    preset: "jest-puppeteer",
    globals: {
      URL: "http://localhost:3000"
    },
    testMatch: [
      "src/tests/**.test.js"
    ],
    verbose: true
  };