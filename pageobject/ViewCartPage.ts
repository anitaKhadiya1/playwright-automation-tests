import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

  const shoppingCartHeader = "h1";
  const shoppingCartProductNames = "//table[contains(@class,'table-bordered')]//tbody//tr//td[2]//a";
  const continueShoppingBtn = "//a[contains(text(),'Continue Shopping')]";
  const allProductTotalPrices = "//div[@class='table-responsive']//table//tbody//tr//td[6]";
  const grandTotal = "//div[@class='row']//div[@class='col-sm-4 col-sm-offset-8']//table//tr[4]//td[2]";
  const checkoutButton = "//a[contains(text(),'Checkout')]";

  const unitPriceByProductName = (productName: string) => `//table[contains(@class,'table-bordered')]//tr[td[2]//a[text()='${productName}']]//td[5]`;
  const removeProductBtnByNameInCart = (productName: string) => `//table[contains(@class,'table-bordered')]//tr[td[2]//a[text()='${productName}']]//button[@data-original-title='Remove']`;
  const quantityInputByProductName = (productName: string) => `//table[contains(@class,'table-bordered')]//tr[td[2]//a[text()='${productName}']]//input[@type='text' and contains(@name,'quantity')]`;
  const updateBtnByProductName = (productName: string) => `//table[contains(@class,'table-bordered')]//tr[td[2]//a[text()='${productName}']]//button[@data-original-title='Update']`;
  const totalPriceByProductName = (productName: string) => `//table[contains(@class,'table-bordered')]//tr[td[2]//a[text()='${productName}']]//td[last()]`;

  export class ViewCartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Retrieves the text of the shopping cart header.
   * Used to verify that the user is on the correct page.
   * @returns The text content of the shopping cart header.
   */
  async getShoppingCartHeaderText() {
    return this.getText(shoppingCartHeader);
  }

  /**
   * Gets the names of all products currently in the shopping cart.
   * Useful for verifying that the correct items are in the cart.
   * @returns An array of product names in the cart.
   */
  async getShoppingCartProductNames(): Promise<string[]> {
    return this.page.$$eval(shoppingCartProductNames, els => els.map(e => e.textContent?.trim() || ''));
  }

  /**
   * Retrieves the unit price of a specific product in the cart.
   * Used to verify pricing information for individual items.
   * @param productName The name of the product to check.
   * @returns The unit price of the specified product as a string.
   */
  async getUnitPriceByProductName(productName: string): Promise<string> {
    return (await this.getText(unitPriceByProductName(productName)))?.trim() || '';
  }

  /**
   * Removes a specific product from the cart page.
   * Used to test the removal functionality in the cart.
   * @param productName The name of the product to remove.
   */
  async removeProductFromCartPageByName(productName: string) {
    await this.clickOn(removeProductBtnByNameInCart(productName));
  }

  /**
   * Clicks the 'Continue Shopping' button.
   * Used to navigate back to the product listing or home page from the cart.
   */
  async clickContinueShopping() {
    await this.clickOn(continueShoppingBtn);
  }

  /**
   * Updates the quantity of a specific product in the cart.
   * Used to test quantity adjustment functionality.
   * @param productName The name of the product to update.
   * @param quantity The new quantity to set.
   */
  async updateProductQuantity(productName: string, quantity: number) {
    await this.enterText(quantityInputByProductName(productName), quantity.toString());
    await this.clickOn(updateBtnByProductName(productName));
  }

  /**
   * Gets the total price for a specific product in the cart.
   * Used to verify price calculations after quantity changes.
   * @param productName The name of the product to check.
   * @returns The total price of the specified product as a string.
   */
  async getTotalPriceByProductName(productName: string): Promise<string> {
    return (await this.getText(totalPriceByProductName(productName)))?.trim() || '';
  }

  /**
   * Retrieves the total prices of all products in the cart.
   * Used for verifying subtotal calculations.
   * @returns An array of numbers representing the total prices of all products.
   */
  async getAllProductTotalPrices(): Promise<number[]> {
    const prices = await this.page.$$eval(allProductTotalPrices, els => els.map(e => parseFloat((e.textContent || '').replace(/[^\d.]/g, ''))));
    return prices;
  }

  /**
   * Gets the grand total of the cart.
   * Used to verify the final total calculation including any taxes or discounts.
   * @returns The grand total of the cart as a number.
   */
  async getGrandTotal(): Promise<number> {
    const text = await this.getText(grandTotal);
    return parseFloat((text || '').replace(/[^\d.]/g, ''));
  }

  /**
   * Clicks the checkout button to proceed with the order.
   * Used to initiate the checkout process from the cart page.
   */
  async clickCheckoutButton() {
    await this.clickOn(checkoutButton);
  }
}
