import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Locators
const componentsMenu = '//a[text()="Components"]';
const printersLink = '//a[text()="Printers"]';
const myAccountDropdown = "//a[@title='My Account']";
const productPriceSymbol = "//a[text()='MacBook']/ancestor::div[contains(@class, 'product-layout')]//p[@class='price']";
const wishlistCount = "//a[@id='wishlist-total']";
const cartTotalCount = 'span#cart-total';
const searchInput = 'input[name="search"]';
const searchButton = 'button[type="button"][class*="btn-default"]';
const cartDropdown = "//button[@class='btn btn-inverse btn-block btn-lg dropdown-toggle']";
const cartProductNames = "//ul[@class='dropdown-menu pull-right']//td[@class='text-left']/a";
const registerLink = "//ul[@class='dropdown-menu dropdown-menu-right']//a[text()='Register']";
const loginLink = "//ul[@class='dropdown-menu dropdown-menu-right']//a[text()='Login']";
const homePageHeading = "//div[@id='logo']/a/img[@alt='OpenCart']";
const cartTotalPrice = "//table[@class='table table-bordered']//tr[4]//td[2]";
const currencyDropdown = "//button[@class='btn btn-link dropdown-toggle']";
const cartProductPrices = "//ul[@class='dropdown-menu pull-right']//li[1]//tr//td[@class='text-right'][2]";
const viewCartLink = "//a[contains(@href,'route=checkout/cart') and contains(.,'View Cart')]";
const checkoutLinkInCartPopup = "//p[@class='text-right']//a[contains(@href,'route=checkout/checkout') and contains(.,'Checkout')]";

const currencyButtonByText = (currencyText: string) => `//form[@id='form-currency']//button[normalize-space()='${currencyText}']`;
const addToWishlistBtnByName = (productName: string) => `//a[text()='${productName}']/ancestor::div[contains(@class, 'product-layout')]//button[@data-original-title='Add to Wish List']`;
const searchProductNameLink = (name: string) => `//div[contains(@class, 'product-thumb')]//a[text()='${name}']`;
const addToCartBtnByName = (productName: string) => `//a[text()='${productName}']/ancestor::div[contains(@class, 'product-layout')]//span[text()='Add to Cart']`;
const productPriceByName = (productName1: string) => `//a[text()='${productName1}']/ancestor::div[contains(@class, 'product-layout')]//p[@class='price']`;
const cartPopupPriceByProductName = (productName: string) => `//ul[@class='dropdown-menu pull-right']//a[text()='${productName}']/ancestor::tr//td[4]`;
const removeProductBtnByName = (productName: string) => `//a[text()='${productName}']/ancestor::tr//button[contains(@onclick, 'cart.remove')]`;

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigates to the Printers category under Components menu.
   * This method is useful for testing the navigation structure and category pages.
   */
  async goToPrintersCategory() {
    await this.page.hover(componentsMenu);
    await this.clickOn(printersLink);
  }

  /**
   * Clicks on My Account dropdown and selects Register option.
   * Used for initiating the user registration process from the home page.
   */
  async clickMyAccountAndRegister() {
    await this.clickOn(myAccountDropdown);
    await this.clickOn(registerLink);
  }

  /**
   * Clicks on My Account dropdown and selects Login option.
   * Used for initiating the user login process from the home page.
   */
  async clickMyAccountAndLogin() {
    await this.clickOn(myAccountDropdown);
    await this.clickOn(loginLink);
  }

  /**
   * Retrieves the text of the home page heading (OpenCart logo alt text).
   * Useful for verifying that the correct page has loaded.
   */
  async isHomePageLogoVisible(): Promise<boolean> {
  await this.page.waitForSelector(homePageHeading, { state: 'visible', timeout: 5000 });
  return this.page.isVisible(homePageHeading);
}

  /**
   * Performs a product search using the search input field.
   * @param productName - The name of the product to search for.
   * Used to test the search functionality of the e-commerce site.
   */
  async searchForProduct(productName: string) {
    await this.enterText(searchInput, productName);
    await this.clickOn(searchButton);
  }

  /**
   * Checks if a specific product is displayed in the search results.
   * @param productName - The name of the product to look for.
   * Used to verify search results accuracy.
   */
  async isProductDisplayed(productName: string) {
    return this.page.isVisible(searchProductNameLink(productName));
  }

  /**
   * Clicks on a product link by its name.
   * @param name - The name of the product to click.
   * Used for navigating to specific product pages from search results or listings.
   */
  async clickProductLinkByName(name: string) {
    await this.clickOn(searchProductNameLink(name));
  }

  /**
   * Changes the currency on the site.
   * @param currencyText - The text of the currency to select.
   * Used for testing price display in different currencies.
   */
  async changeCurrencyByText(currencyText: string) {
    await this.clickOn(currencyDropdown);
    await this.clickOn(currencyButtonByText(currencyText));
  }

  /**
   * Gets the currency symbol of the first product price on the page.
   * Used to verify currency change has been applied correctly.
   */
  async getFirstProductPriceSymbol() {
    return this.getText(productPriceSymbol);
  }

  /**
     * Adds a product to the wishlist by its name.
     * @param productName - The name of the product to add to wishlist.
     * Used for testing wishlist functionality.
     */
  async addProductToWishlistByName(productName: string) {
    await this.clickOn(addToWishlistBtnByName(productName));
  }

  /**
     * Gets the text of the wishlist count in the header.
     * Used to verify that products are correctly added to the wishlist.
     */
  async getWishlistCountText(): Promise<string> {
  await this.page.waitForSelector(wishlistCount, { state: 'visible', timeout: 5000 });
  await this.page.waitForTimeout(1000);
  const text = await this.getText(wishlistCount);
  return text || '';
  }

  /**
     * Adds a product to the cart by its name.
     * @param productName - The name of the product to add to cart.
     * Used for testing the add to cart functionality.
     */
  async addProductToCartByName(productName: string) {
    await this.clickOn(addToCartBtnByName(productName));
  }

  /**
     * Opens the cart popup.
     * Used to access cart details without navigating away from the current page.
     */
  async openCartPopup() {
    await this.clickOn(cartDropdown);
    await this.page.waitForSelector(cartDropdown);
  }

  /**
     * Gets the names of products in the cart popup.
     * Used to verify that the correct products have been added to the cart.
     */
  async getCartProductNames() {
    return this.page.$$eval(cartProductNames, els => els.map(e => e.textContent?.trim() || ''));
  }

  /**
 * Gets the text of the cart total in the header.
 * Used to verify the cart count and total are updated correctly.
 */
  async getCartTotalText(): Promise<string> {
  await this.page.waitForSelector(cartTotalCount, { state: 'visible', timeout: 8000 });
  await this.page.waitForTimeout(2000);
  const text = await this.getText(cartTotalCount);
  return text || '';
  }

  /**
     * Removes a product from the cart by its name.
     * @param productName - The name of the product to remove.
     * Used for testing the remove from cart functionality.
     */
  async removeProductFromCartByName(productName: string) {
    await this.clickOn(removeProductBtnByName(productName));
  }

  /**
     * Gets the price of a product by its name.
     * @param productName1 - The name of the product.
     * Used to verify product prices on the page.
     */
  async getProductPriceByName(productName1: string): Promise<string> {
    await this.page.waitForSelector(productPriceByName(productName1));
    const priceElement = await this.page.$(productPriceByName(productName1));
    const priceText = await priceElement?.textContent() || '';
    // Clean up the price text - remove currency symbols and extra spaces
    const cleanedPrice = priceText.replace(/[^\d.]/g, '').trim();
    // Remove the last 5 characters from the price
    if (cleanedPrice.length > 5) {
      return cleanedPrice.slice(0, -6);
    }

    return cleanedPrice;
  }

  /**
     * Gets the prices of products in the cart popup.
     * Used to verify that product prices in the cart are correct.
     */
  async getCartProductPrices() {
    return this.page.$$eval(cartProductPrices, els => els.map(e => (e.textContent || '').replace(/[^\d.]/g, '').trim()));
  }

  /**
     * Gets the price of a specific product in the cart popup.
     * @param productName - The name of the product.
     * Used to verify individual product prices in the cart.
     */
  async getCartPopupPriceByProductName(productName: string): Promise<string> {
    return (await this.getText(cartPopupPriceByProductName(productName)))?.trim() || '';
  }

  /**
     * Calculates the sum of all product prices in the cart.
     * @returns The sum of all product prices in the cart.
     */
  async getCartProductPricesAsNumbers(): Promise<{ prices: number[], sum: number }> {
    const prices = await this.page.$$eval(cartProductPrices, els =>
      els.map(e => parseFloat((e.textContent || '').replace(/[^\d.]/g, '').trim()))
    );
    const sum = prices.reduce((a, b) => a + b, 0);
    return { prices, sum };
  }

  /**
     * Gets the total price of the cart.
     * Used to verify the cart total calculation.
     */
  async getCartTotalPrice(): Promise<number> {
    const totalText = await this.getText(cartTotalPrice);
    return parseFloat((totalText || '').replace(/[^\d.]/g, '').trim());
  }

  /**
     * Clicks on the View Cart link.
     * Used to navigate to the full cart page from the cart popup.
     */
  async clickViewCart() {
    await this.clickOn(viewCartLink);
  }

  /**
     * Clicks on the Checkout link in the cart popup.
     * Used to initiate the checkout process from the cart popup.
     */
  async clickCheckoutInCartPopup() {
    await this.clickOn(checkoutLinkInCartPopup);
  }
}