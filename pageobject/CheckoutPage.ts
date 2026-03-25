import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

const checkoutHeading = "h1";
const emailInput = 'input[name="email"]';
const passwordInput = 'input[name="password"]';
const loginButton = 'input[value="Login"], button:has-text("Login")';
const accountBillingDetailsText = 'text=Account & Billing Details';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Retrieves the checkout page heading text.
   * Useful for verifying that the user is on the checkout page.
   * @returns The text content of the checkout heading.
   */
  async getCheckoutHeading() {
    return this.getText(checkoutHeading);
  }

  /**
   * Performs login as a returning customer by entering email and password, then clicking login.
   * Used in scenarios where login is required during checkout.
   * @param email - Customer's email address
   * @param password - Customer's password
   */

  // use only here loginobject and call the data property
  async loginAsReturningCustomer(email: string, password: string) {
    await this.enterText(emailInput, email);
    await this.enterText(passwordInput, password);
    await this.clickOn(loginButton);
  }

  /**
   * Checks whether the 'Account & Billing Details' section is visible.
   * Useful for verifying successful login or page load.
   * @returns Boolean indicating the visibility of billing details.
   */
  async isAccountBillingDetailsVisible() {
    return this.page.locator(accountBillingDetailsText).isVisible();
  }
}