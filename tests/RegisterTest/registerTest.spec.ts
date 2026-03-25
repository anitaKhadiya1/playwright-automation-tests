
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pageobject/HomePage';
import { RegistrationPage } from '../../pageobject/RegistrationPage';
import { generateRegistrationData } from '../../datafactory/RegistrationData';
import { Constants } from '../../utilities/Constants';

test.describe('registerpage', () => {

  test.beforeEach(async ({ page }) => {
    console.log('Navigating to home page');
    await page.goto('/');
});

test('Verify that the user can navigate to the registration page and register successfully', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegistrationPage(page);
  let i: number = 1;

  console.log(`Step ${i}: Verifying the home page heading`);
  const headingText = await homePage.isHomePageLogoVisible();
  expect(headingText).toBe(true);

  console.log(`Step ${++i}: Clicking on My Account and then Register`);
  await homePage.clickMyAccountAndRegister();

  console.log(`Step ${++i}: Verifying the registration page heading`);
  const RegisterheadingText = await registerPage.getRegisterPageHeadingText();
  expect(RegisterheadingText).toContain(Constants.REGISTER_ACCOUNT_TITLE);

  console.log(`Step ${++i}: Filling the registration form with generated user data`);
  const userData = generateRegistrationData();
  await registerPage.fillForm(userData);

  console.log(`Step ${++i}: Solving CAPTCHA and agreeing to privacy policy`);
  await registerPage.solveCaptcha();
  await registerPage.agreeToPrivacyPolicy();

  console.log(`Step ${++i}: Submitting the registration form`);
  await registerPage.clickContinue();
});

test('Verify that warning messages are shown when submitting an empty registration form without agreeing to the privacy policy', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegistrationPage(page);
  let i: number = 1;

  console.log(`Step ${i}: Clicking on My Account and then Register`);
  await homePage.clickMyAccountAndRegister();

  console.log(`Step ${++i}: Attempting to submit an empty registration form`);
  await registerPage.clickContinue();

  console.log(`Step ${++i}: Verifying the privacy policy warning message`);
  const warning = await registerPage.getWarningMessage();
  expect(warning).toContain(Constants.PRIVACY_POLICY_WARNING);

  console.log(`Step ${++i}: Checking for field-specific error messages`);
  const errorMessages = await registerPage.getAllFieldErrorMessages();
  expect(errorMessages.length).toBeGreaterThan(0);

  const expectedMessages = [
    Constants.FIRST_NAME_ERROR,
    Constants.LAST_NAME_ERROR,
    Constants.EMAIL_ERROR,
    Constants.TELEPHONE_ERROR,
    Constants.PASSWORD_ERROR,
    Constants.CAPTCHA_ERROR
  ];

  console.log(`Step ${++i}: Verifying all expected error messages are present`);
  for (const expected of expectedMessages) {
    expect(errorMessages).toContain(expected);
  }
});
});