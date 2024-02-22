LT_USERNAME = process.env.LT_USERNAME || "Username";
LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "access key";

exports.capabilities = {
  build: "Mocha-Selenium", //Build name
  name: "Add To Cart", // Test name
  platform: "Windows 10", // OS name
  browserName: "chrome", // Browser name
  version: "latest", // Browser version
};
