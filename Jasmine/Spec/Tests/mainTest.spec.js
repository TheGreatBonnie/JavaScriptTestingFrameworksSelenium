const addToCart = require("../pageModel/addToCart.main");

//to set jasmine default timeout
jasmine.DEFAULT_TIMEOUT_INTERVAL = 80 * 1000;
jasmine.getEnv().defaultTimeoutInterval = 800000;

// Start to write the first test case
describe("E-Commerce Site Automated Tests", function () {
  beforeEach(async () => {
    addToCart.before();
  });

  afterEach(async () => {
    addToCart.quitB();
  });

  it("Add Item To Cart", async function () {
    await addToCart.visit();

    // Add to cart
    await addToCart.categoryBtn();
    await addToCart.phonesCategoryBtn();
    await addToCart.iPhoneBtn();
    await addToCart.addToCartBtn();
    await addToCart.cartBtn();
    await addToCart.itemName();
  });

});

