import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Locators
const emptyCategoryMessage = '//div[@id="content"]';
const continueButton = '//a[text()="Continue"]';
const productName = '//div[@id="content"]//h1';
const productPrice = '//div[@id="content"]//ul[@class="list-unstyled"]/li/h2';
const addToCartButton = '//button[@id="button-cart" or contains(text(),"Add to Cart")]';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
    * Retrieves the text message indicating an empty category,
    * such as a message shown when no products are available.
    * @returns The message text.
    */
  async getEmptyCategoryMessage() {
    return this.getText(emptyCategoryMessage);
  }

  /**
     * Clicks the 'Continue' button, often used to navigate back or proceed.
     */
  async clickContinue() {
    await this.clickOn(continueButton);
  }

  /**
     * Retrieves the product name displayed on the product page.
     * Useful for verification that the correct product detail page is loaded.
     * @returns The product name string.
     */
  async getProductName() {
    return (await this.getText(productName))?.trim();
  }

  /**
     * Retrieves the product price, parsing out non-numeric characters.
     * Useful for verifying price details.
     * @returns The product price as a string of digits and decimal point.
     */
  async getProductPrice(): Promise<string> {
    const priceText = (await this.getText(productPrice))?.trim() || '';
    return priceText.replace(/[^\d.]/g, '');
  }

  /**
     * Clicks the 'Add to Cart' button to add the current product to the shopping cart.
     */
  async clickAddToCart() {
    await this.clickOn(addToCartButton);
  }
}