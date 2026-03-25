import { test as base } from '@playwright/test';
import { HomePage } from '../pageobject/HomePage';
import { ViewCartPage } from '../pageobject/ViewCartPage';
import { ProductPage } from '../pageobject/ProductPage';
import { RegistrationPage } from '../pageobject/RegistrationPage';
import { CheckoutPage } from '../pageobject/CheckoutPage';
import { LoginData } from '../datafactory/LoginData';
// Import other page objects as needed

type BaseFixtures = {
  homePage: HomePage;
  viewCartPage: ViewCartPage;
  productPage: ProductPage;
  registrationPage: RegistrationPage;
  checkoutPage: CheckoutPage;
  loginData: LoginData;
  // Add other page objects as needed
};

export const test = base.extend<BaseFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await page.goto('/');
    await use(homePage);
  },
  viewCartPage: async ({ page }, use) => {
    const viewCartPage = new ViewCartPage(page);
    await use(viewCartPage);
  },
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await use(registrationPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  loginData: async ({}, use) => {
    const loginData = new LoginData();
    await use(loginData);
  },
  // Add other page objects as needed
});

export { expect } from '@playwright/test';