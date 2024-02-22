selenium = require("selenium-webdriver");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { Select } = require("selenium-webdriver");
require("dotenv").config();

const username = process.env.LT_USERNAME;
const accessKey = process.env.LT_ACCESS_KEY;

var remoteHub =
  "https://" + username + ":" + accessKey + "@hub.lambdatest.com/wd/hub";

const chromeWindowsCapability = {
  browserName: "Chrome",
  browserVersion: "118.0",
  "LT:Options": {
    username: username,
    accessKey: accessKey,
    platformName: "Windows 10",
    project: "JasmineSeleniumE2E",
    name: "E2E",
    w3c: true,
    plugin: "node_js-node_js",
  },
};

const safariMacOSCapability = {
  browserName: "Safari",
  browserVersion: "17.0",
  "LT:Options": {
    username: "UserName",
    accessKey: "AccessKey",
    platformName: "macOS Sonoma",
    project: "JasmineSeleniumE2E",
    name: "E2E",
    w3c: true,
    plugin: "node_js-node_js",
  },
};

const fireFoxLinuxcapability = {
  browserName: "Firefox",
  browserVersion: "118.0",
  "LT:Options": {
    username: "UserName",
    accessKey: "AccessKey",
    platformName: "Linux",
    project: "JasmineSeleniumE2E",
    name: "E2E",
    w3c: true,
    plugin: "node_js-node_js",
  },
};

const getElementById = async (driver, id, timeout = 8000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByXpath = async (driver, xpath, timeout = 8000) => {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const seleniumDriver = new selenium.Builder()
  .usingServer(remoteHub)
  .withCapabilities(chromeWindowsCapability)
  .build();

class Main {
  constructor() {
    this.driver = seleniumDriver;
    this.byId = getElementById;
    this.byXpath = getElementByXpath;
  }
}

module.exports = Main;
