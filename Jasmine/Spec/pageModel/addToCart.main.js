const Main = require('./main');

const ecommerceUrl = "https://ecommerce-playground.lambdatest.io/";

class AddToCart extends Main {
  
    constructor() {
      super();
      this.url = ecommerceUrl;

      this.categoryButton = ('//a[normalize-space()="Shop by Category"]');
      this.phonesCategoryButton = ('//span[normalize-space()="Phone, Tablets & Ipod"]');
      this.iPhoneButton = ('//div[@class="carousel-item active"]//img[@title="iPhone"]');
      this.addToCartButton = ('//div[@id="entry_216842"]//button[@title="Add to Cart"][normalize-space()="Add to Cart"]');
      this.cartButton = ('//a[@class="btn btn-primary btn-block"]');
      this.itemNameText = ('//td[@class="text-left"]//a[contains(text(),"iPhone")]');
    }

    async visit() {
        await this.driver.get(this.url);
      }
    
      async before() {
        this.driver;
      }
    
      async quitB() {
        await this.driver.quit();
      }
      
      async categoryBtn() {
        const categoryBtn = await this.byXpath(this.driver, this.categoryButton);
        await categoryBtn.click();
      }
    
      async phonesCategoryBtn() {
        const phonesCategoryBtn = await this.byXpath(this.driver, this.phonesCategoryButton);
        await phonesCategoryBtn.click();
      }
    
      async iPhoneBtn() {
        const HTCPhoneBtn = await this.byXpath(this.driver, this.iPhoneButton);
        await HTCPhoneBtn.click();
      }
    
      async addToCartBtn() {
        const categoryBtn = await this.byXpath(this.driver, this.addToCartButton);
        await categoryBtn.click();
      }
    
      async cartBtn() {
        const cartBtn = await this.byXpath(this.driver, this.cartButton);
        await cartBtn.click();
      }
    
      async itemName() {
        const itemName = await this.byXpath(this.driver, this.itemNameText);
        itemName.getText().then(function (value) {
          expect(value).toBe("iPhone");
        });
      }
}

module.exports = new AddToCart();