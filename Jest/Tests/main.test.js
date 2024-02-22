const webdriver = require("selenium-webdriver");
const { until } = require("selenium-webdriver");
const { By } = require("selenium-webdriver");
const LambdaTestRestClient = require("@lambdatest/node-rest-client");

const username = process.env.LT_USERNAME || "Username";
const accessKey = process.env.LT_ACCESS_KEY || "accessKey";

const AutomationClient = LambdaTestRestClient.AutomationClient({
  username,
  accessKey,
});

const chromeWindowsCapability = {
  browserName: "Chrome",
  browserVersion: "105.0",
  "LT:Options": {
    username: "Username",
    accessKey: "accessKey",
    platformName: "Windows 10",
    project: "Untitled",
    w3c: true,
    plugin: "node_js-node_js",
  },
};

const SafariMacosCapability = {
  browserName: "Safari",
  browserVersion: "16.0",
  "LT:Options": {
    username: "Username",
    accessKey: "Access Key",
    platformName: "MacOS Ventura",
    project: "Untitled",
    w3c: true,
    plugin: "node_js-node_js",
  },
};

const firefoxWindowsCapability = {
  browserName: "Firefox",
  browserVersion: "106.0",
  "LT:Options": {
    username: "Username",
    accessKey: "Access Key",
    platformName: "Windows 11",
    project: "Untitled",
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

// let sessionId = null;

describe("Ecommerce Site Automated Test", () => {
  let driver;
  beforeAll(async () => {
    driver = new webdriver.Builder()
      .usingServer(
        "https://" + username + ":" + accessKey + "@hub.lambdatest.com/wd/hub"
      )
      .withCapabilities(chromeWindowsCapability)
      .build();
    await driver.getSession().then(function (session) {
      sessionId = session.id_;
    });
    // eslint-disable-next-line no-undef
    await driver.get(`https://ecommerce-playground.lambdatest.io/`);
  }, 50000);

  afterAll(async () => {
    await driver.quit();
  }, 40000);

  test("Add Item To Cart", async () => {
    try {
      const categoryBtn = await getElementByXpath(
        driver,
        '//a[normalize-space()="Shop by Category"]'
      );
      await categoryBtn.click();

      const phonesCategoryBtn = await getElementByXpath(
        driver,
        '//span[normalize-space()="Phone, Tablets & Ipod"]'
      );
      await phonesCategoryBtn.click();

      const iPhoneBtn = await getElementByXpath(
        driver,
        '//div[@class="carousel-item active"]//img[@title="iPhone"]'
      );
      await iPhoneBtn.click();

      const addToCartBtn = await getElementByXpath(
        driver,
        '//div[@id="entry_216842"]//button[@title="Add to Cart"][normalize-space()="Add to Cart"]'
      );
      await addToCartBtn.click();

      const cartBtn = await getElementByXpath(
        driver,
        '//a[@class="btn btn-primary btn-block"]'
      );
      await cartBtn.click();

      const itemName = await getElementByXpath(
        driver,
        '//td[@class="text-left"]//a[contains(text(),"iPhone")]'
      );
      itemName.getText().then(function (value) {
        expect(value).toBe("iPhone");
      });

      await updateJob(sessionId, "passed");
    } catch (err) {
      await updateJob(sessionId, "failed");
      await webdriverErrorHandler(err, driver);
      throw err;
    }
  }, 100000);
});

async function webdriverErrorHandler(err, driver) {
  console.error("Unhandled exception! " + err.message);
  if (driver && sessionId) {
    try {
      await driver.quit();
    } catch (_) {}
    await updateJob(sessionId, "failed");
  }
}
function updateJob(sessionId, status) {
  return new Promise((resolve, reject) => {
    AutomationClient.updateSessionById(
      sessionId,
      { status_ind: status },
      (err) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}
