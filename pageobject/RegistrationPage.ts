import { Page } from '@playwright/test';
import * as Tesseract from 'tesseract.js';
import { BasePage } from './BasePage';

const registerPageHeading = "//h1[contains(text(), 'Register Account')]";
const continueBtn = "//input[@type='submit']";
const warningMessage = "//div[contains(@class, 'alert-danger')]";
const fieldErrorMessages = "//div[contains(@class, 'text-danger')]";
const firstNameInput = 'input[name="firstname"]';
const lastNameInput = 'input[name="lastname"]';
const emailInput = 'input[name="email"]';
const telephoneInput = 'input[name="telephone"]';
const passwordInput = 'input[name="password"]';
const confirmPasswordInput = 'input[name="confirm"]';
const privacyPolicyCheckbox = 'input[name="agree"]';
const captchaImage = "//img[contains(@src, 'captcha')]";
const captchaInput = 'input[name="captcha"]';


export class RegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Retrieves the text content of the registration page heading.
   * Useful for verifying that the user is on the registration page.
   * @returns The header text content.
   */
  async getRegisterPageHeadingText() {
    return this.getText(registerPageHeading);
  }

  /**
   * Fills out the registration form fields with provided user details.
   * This populates all essential input fields required for registration.
   * @param param0 Object containing firstName, lastName, email, telephone, and password.
   */
  async fillForm({ firstName, lastName, email, telephone, password }:
    { firstName: string, lastName: string, email: string, telephone: string, password: string }) {
    await this.enterText(firstNameInput, firstName);
    await this.enterText(lastNameInput, lastName);
    await this.enterText(emailInput, email);
    await this.enterText(telephoneInput, telephone);
    await this.enterText(passwordInput, password);
    await this.enterText(confirmPasswordInput, password);
  }

  /**
   * Checks the privacy policy agreement checkbox.
   * Ensures the user agrees to privacy terms before submitting.
   */
  async agreeToPrivacyPolicy() {
    await this.page.check(privacyPolicyCheckbox);
  }

  /**
   * Clicks the continue button to submit the registration form.
   * Used to initiate the registration process after form completion.
   */
  async clickContinue() {
    await this.clickOn(continueBtn);
  }

  /**
   * Retrieves any warning or alert message displayed.
   * Useful for capturing validation or error messages upon form submission.
   * @returns The warning message text.
   */
  async getWarningMessage() {
    return this.getText(warningMessage);
  }

  /**
   * Collects all field-specific error messages displayed on the form.
   * Helpful for validating form input errors and feedback.
   * @returns An array of error message strings.
   */
  async getAllFieldErrorMessages() {
    return (await this.page.$$eval(fieldErrorMessages, nodes => nodes.map(n => n.textContent?.trim() || '').filter(Boolean)));
  }



// write a all the locator in upper side not in the methods or hardcoded here


  /**
   * Solves the CAPTCHA by extracting the text from the CAPTCHA image.
   * Takes a screenshot of the CAPTCHA, performs OCR, and inputs the result.
   */
  async solveCaptcha() {
    const captchaElement = await this.page.waitForSelector(captchaImage);
    if (!captchaElement) {
      throw new Error('CAPTCHA image not found');
    }
    const captchaPath = 'captcha.png';
    await captchaElement.screenshot({ path: captchaPath });
    const result = await Tesseract.recognize(captchaPath, 'eng');
    const extractedText = result.data.text.trim();
    await this.enterText(captchaInput, extractedText);
  }
}