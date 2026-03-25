import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pageobject/ProductPage';
import { HomePage } from '../../pageobject/HomePage';
import { ProductData } from '../../datafactory/ProductData';
import { Constants } from '../../utilities/Constants';
const productDetails = ProductData.getProductDetails();

test.describe('productpage', () => {

  test.beforeEach(async ({ page }) => {
    console.log('Navigating to home page');
    await page.goto('/');
});

test('Verify that navigating to an empty category displays an empty message and clicking "Continue" navigates back to the home page', async ({ page }) => {
  const productPage = new ProductPage(page);
  const homePage = new HomePage(page);
  let i: number = 1;

  console.log(`Step ${i}: Navigating to Printers category`);
  await homePage.goToPrintersCategory();

  console.log(`Step ${++i}: Verifying empty category message`);
  const message = await productPage.getEmptyCategoryMessage();
  expect(message).toContain('There are no products to list in this category.');

  console.log(`Step ${++i}: Clicking Continue button`);
  await productPage.clickContinue();

  console.log(`Step ${++i}: Verifying the home page heading`);
  const headingText = await homePage.isHomePageLogoVisible();
  expect(headingText).toBe(true);
});

test('Verify that clicking a product link from the home page navigates to the product page, displays correct details, and adding to cart updates the cart count', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  let i: number = 1;

  console.log(`Step ${i}: Getting MacBook price from home page`);
  const homeProductPrice = await homePage.getProductPriceByName(productDetails.ProductMacBook);

  console.log(`Step ${++i}: Clicking on MacBook link`);
  await homePage.clickProductLinkByName(productDetails.ProductMacBook);

  console.log(`Step ${++i}: Verifying MacBook name on product page`);
  const name = await productPage.getProductName();
  expect(name).toBe('MacBook');

  console.log(`Step ${++i}: Verifying MacBook price on product page matches home page`);
  const productPagePrice = await productPage.getProductPrice();
  expect(productPagePrice).toBe(homeProductPrice);

  console.log(`Step ${++i}: Adding MacBook to cart`);
  await productPage.clickAddToCart();

  console.log(`Step ${++i}: Verifying cart count update`);
  const cartCount = await homePage.getCartTotalText();
  expect(cartCount).toContain('1 item');
});
});