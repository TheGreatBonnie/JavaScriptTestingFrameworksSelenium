var assert = require("assert"),
  webdriver = require("selenium-webdriver"),
  conf_file = process.argv[3] || "conf/addToCart.conf.js";

var caps = require("../" + conf_file).capabilities;

var buildDriver = function (caps) {
  return new webdriver.Builder()
    .usingServer(
      "http://" +
        LT_USERNAME +
        ":" +
        LT_ACCESS_KEY +
        "@hub.lambdatest.com/wd/hub"
    )
    .withCapabilities(caps)
    .build();
};

describe("Ecommerce Automated Tests", function () {
  var driver;
  this.timeout(0);

  beforeEach(function (done) {
    caps.name = this.currentTest.title;
    driver = buildDriver(caps);
    done();
  });

  it("Add To Cart Test", function (done) {
    driver.get("https://ecommerce-playground.lambdatest.io/").then(function () {
      setTimeout(function () {
        driver
          .findElement(
            webdriver.By.xpath('//a[normalize-space()="Shop by Category"]')
          )
          .click();
        driver
          .findElement(
            webdriver.By.xpath('//a[normalize-space()="Shop by Category"]')
          )
          .click();
        driver
          .findElement(webdriver.By.xpath('//a[normalize-space()="iPhone"]'))
          .click();
        driver
          .findElement(
            webdriver.By.xpath(
              '//div[@id="entry_216842"]//button[@title="Add to Cart"][normalize-space()="Add to Cart"]'
            )
          )
          .click();
        driver
          .findElement(
            webdriver.By.xpath('//a[@class="btn btn-primary btn-block"]')
          )
          .click();
        driver
          .findElement(
            webdriver.By.xpath(
              '//td[@class="text-left"]//a[contains(text(),"iPhone")]'
            )
          )
          .click();
        done();
      }, 10000);
    });
  });

  afterEach(function (done) {
    if (this.currentTest.isPassed()) {
      driver.executeScript("lambda-status=passed");
    } else {
      driver.executeScript("lambda-status=failed");
    }
    driver.quit().then(function () {
      done();
    });
  });
});
