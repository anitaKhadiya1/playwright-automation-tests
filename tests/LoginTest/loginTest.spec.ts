import { test, expect } from '@playwright/test';
import { HomePage } from '../../pageobject/HomePage';
import { LoginPage } from '../../pageobject/LoginPage';
import { generateLoginData } from '../../datafactory/LoginData';
import { Constants } from '../../utilities/Constants';

test.describe('loginpage', () => {

  test.beforeEach(async ({ page }) => {
    console.log('Navigating to home page');
    await page.goto('/');
});

test('Verify that a warning message is shown for invalid login credentials', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  let i: number = 1;

  console.log(`Step ${i}: Clicking on My Account and Login`);
  await homePage.clickMyAccountAndLogin();

  console.log(`Step ${++i}: Generating login data`);
  const userData = generateLoginData();

  console.log(`Step ${++i}: Filling login form with invalid credentials`);
  await loginPage.fillLoginForm(userData);

  console.log(`Step ${++i}: Clicking login button`);
  await loginPage.clickLogin();

  console.log(`Step ${++i}: Checking for warning message`);
  const warning = await loginPage.getWarningMessage();
  expect(warning).toContain(Constants.NOMATCH_WARNING_MESSAGE);
});

test('Verify that a warning message is shown for an invalid email on the forgotten password page and the user can navigate back to the login page', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  let i: number = 1;

  console.log(`Step ${i}: Clicking on My Account and Login`);
  await homePage.clickMyAccountAndLogin();

  console.log(`Step ${++i}: Clicking on Forgotten Password`);
  await loginPage.clickForgotPassword();

  console.log(`Step ${++i}: Generating login data`);
  const userData = generateLoginData();

  console.log(`Step ${++i}: Filling forgotten password email form`);
  await loginPage.fillForgotEmail(userData);

  console.log(`Step ${++i}: Clicking Continue button`);
  await loginPage.clickContinue();

  console.log(`Step ${++i}: Checking for warning message`);
  const warning = await loginPage.getWarningMessage();
  expect(warning).toContain(Constants.EMAIL_NOTFOUND_MESSAGE);

  console.log(`Step ${++i}: Clicking Back button`);
  await loginPage.clickBack();

  console.log(`Step ${++i}: Verifying return to login page`);
  const isLoginPage = await loginPage.isLoginPageDisplayed();
  expect(isLoginPage).toBeTruthy();
});
});