import { test } from '@playwright/test';
import { HomePage } from '../../pageobject/HomePage';
import { CheckoutPage } from '../../pageobject/CheckoutPage';
import { LoginData } from '../../datafactory/LoginData';
import { ProductData } from '../../datafactory/ProductData';

const productDetails  = ProductData.getProductDetails();
const loginDetails  = LoginData.getLoginValidDetails();
import { expect as chaiExpect } from 'chai';

test.describe('checkout', () => {

  let homePage: HomePage;
  let checkoutPage: CheckoutPage;
  test.beforeEach(async ({ page }) => {
    console.log('Setting up test environment');
    homePage = new HomePage(page);
    checkoutPage = new CheckoutPage(page);
    console.log('Navigating to home page');
    await page.goto('/');
});

test('Verify that clicking checkout in the cart popup navigates to the checkout page', async ({ page }) => {
  let i: number = 1;
  
  console.log(`Step ${++i}: Adding MacBook and iPhone to cart`);
  await homePage.addProductToCartByName(productDetails.ProductMacBook);
  await homePage.addProductToCartByName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Opening cart popup`);
  await homePage.openCartPopup();

  console.log(`Step ${++i}: Clicking checkout in cart popup`);
  await homePage.clickCheckoutInCartPopup();

  console.log(`Step ${++i}: Verifying checkout page heading`);
  const heading = await checkoutPage.getCheckoutHeading();
  chaiExpect(heading).to.equal('Checkout', 'Checkout heading is incorrect');
});

test('Verify that a returning customer can log in during the checkout process after adding a product to the cart', async ({ page }) => {
  let i: number = 1;

  console.log(`Step ${++i}: Adding MacBook to cart`);
  await homePage.addProductToCartByName(productDetails.ProductMacBook);

  console.log(`Step ${++i}: Opening cart popup and clicking checkout`);
  await homePage.openCartPopup();
  await homePage.clickCheckoutInCartPopup();

  console.log(`Step ${++i}: Logging in as returning customer`);
  await checkoutPage.loginAsReturningCustomer(loginDetails.email, loginDetails.password);

  console.log(`Step ${++i}: Verifying account billing details visibility`);
  const isBillingDetailsVisible = await checkoutPage.isAccountBillingDetailsVisible();
  await chaiExpect(isBillingDetailsVisible).to.be.true;
});

});

