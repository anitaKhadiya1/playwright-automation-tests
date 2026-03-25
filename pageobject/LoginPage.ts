import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

const loginPageHeading = "//h2[text()='Returning Customer']";
const emailInput = 'input[name="email"]';
const passwordInput = "//input[@name='password']";
const loginButton = "//input[@type='submit']";
const warningMessage = "//div[contains(@class, 'alert-danger')]";
const forgotPasswordLink = "//div[@class='form-group']//a[text()='Forgotten Password']";
const backButton = "//a[text()='Back']";
const continueBtn = "//input[@value='Continue']";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Retrieves the heading text of the login page.
   * Useful to verify that the user is on the login page.
   * @returns The text content of the login page heading.
   */
  async getLoginPageHeadingText() {
    return this.getText(loginPageHeading);
  }

  /**
   * Fills in the login form with email and password.
   * Used to simulate user login with provided credentials.
   * @param param0 Object containing email and password.
   */
  async fillLoginForm({ email, password }: { email: string; password: string }) {
    await this.enterText(emailInput, email);
    await this.enterText(passwordInput, password);
  }

  /**
   * Fills in only the email field in the forgot password form.
   * Useful when initiating password reset process.
   * @param param0 Object containing email.
   */
  async fillForgotEmail({ email }: { email: string }) {
    await this.enterText(emailInput, email);
  }

  /**
   * Clicks the login button to submit login credentials.
   * Used to perform login action.
   */
  async clickLogin() {
    await this.clickOn(loginButton);
  }

  /**
   * Clicks the 'Forgotten Password' link.
   * Navigates to the password recovery page.
   */
  async clickForgotPassword() {
    await this.clickOn(forgotPasswordLink);
  }

  /**
   * Clicks the 'Continue' button, usually used after some action or page step.
   */
  async clickContinue() {
    await this.clickOn(continueBtn);
  }

  /**
   * Clicks the 'Back' link to return to the previous page.
   */
  async clickBack() {
    await this.clickOn(backButton);
  }

  /**
   * Retrieves any warning or error message displayed on the login page.
   * Useful for validation after login attempts.
   * @returns The warning message text.
   */
  async getWarningMessage() {
    return this.getText(warningMessage);
  }

  /**
   * Checks if the login page is currently displayed by verifying the visibility of the heading.
   * Useful for asserting page navigation in tests.
   * @returns Boolean indicating whether the login page is visible.
   */
  async isLoginPageDisplayed() {
    return this.page.isVisible(loginPageHeading);
  }
}