import { test, expect } from '@playwright/test';
import { HomePage } from '../../pageobject/HomePage';
import { ViewCartPage } from '../../pageobject/ViewCartPage';
import { CheckoutPage } from '../../pageobject/CheckoutPage';
import { ProductData } from '../../datafactory/ProductData';
const productDetails = ProductData.getProductDetails();

test.describe('viewcartpage', () => {

  test.beforeEach(async ({ page }) => {
    console.log('Navigating to home page');
    await page.goto('/');
});

test('Verify that clicking "View Cart" in the cart popup navigates to the shopping cart page and displays added products', async ({ page }) => {
  const homePage = new HomePage(page);
  const viewCartPage = new ViewCartPage(page);
  let i: number = 1;

  console.log(`Step ${i}: Adding MacBook and iPhone to cart`);
  await homePage.addProductToCartByName(productDetails.ProductMacBook);
  await homePage.addProductToCartByName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Opening cart popup and clicking View Cart`);
  await homePage.openCartPopup();
  await homePage.clickViewCart();

  console.log(`Step ${++i}: Verifying shopping cart page header`);
  const headerText = await viewCartPage.getShoppingCartHeaderText();
  expect(headerText).toContain('Shopping Cart');

  console.log(`Step ${++i}: Verifying added products are displayed in the cart`);
  const productNames = await viewCartPage.getShoppingCartProductNames();
  expect(productNames).toContain('MacBook');
  expect(productNames).toContain('iPhone');
});

test('Verify that product prices in the cart popup match the unit prices on the shopping cart page', async ({ page }) => {
  const homePage = new HomePage(page);
  const viewCartPage = new ViewCartPage(page);
  let i: number = 1;

  console.log(`Step ${i}: Adding MacBook and iPhone to cart`);
  await homePage.addProductToCartByName(productDetails.ProductMacBook);
  await homePage.addProductToCartByName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Opening cart popup and getting prices`);
  await homePage.openCartPopup();
  const macbookCartPopupPrice = await homePage.getCartPopupPriceByProductName(productDetails.ProductMacBook);
  const iphoneCartPopupPrice = await homePage.getCartPopupPriceByProductName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Clicking on "View Cart" link`);
  await homePage.clickViewCart();

  console.log(`Step ${++i}: Getting unit prices from shopping cart page`);
  const macbookUnitPrice = await viewCartPage.getUnitPriceByProductName(productDetails.ProductMacBook);
  const iphoneUnitPrice = await viewCartPage.getUnitPriceByProductName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Verifying prices match`);
  expect(macbookCartPopupPrice).toContain(macbookUnitPrice);
  expect(iphoneCartPopupPrice).toContain(iphoneUnitPrice);
});

test('Verify that removing a product from the shopping cart updates the cart item count and after clicking on the "Continue Shopping" add the new product and update the cart count again', async ({ page }) => {
  const homePage = new HomePage(page);
  const viewCartPage = new ViewCartPage(page);
  let i: number = 1;

  console.log(`Step ${i}: Adding MacBook and iPhone to cart`);
  await homePage.addProductToCartByName(productDetails.ProductMacBook);
  await homePage.addProductToCartByName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Navigating to View Cart page`);
  await homePage.openCartPopup();
  await homePage.clickViewCart();

  console.log(`Step ${++i}:Removing iPhone from the shopping cart`);
  await viewCartPage.removeProductFromCartPageByName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Verifying cart item count after removal`);
  let cartText = await homePage.getCartTotalText();
  expect(cartText).toContain('1 item');

  console.log(`Step ${++i}: Clicking Continue Shopping and verifying redirection to home page`);
  await viewCartPage.clickContinueShopping();
  const headingText = await homePage.isHomePageLogoVisible();
  expect(headingText).toBe(true);

  console.log(`Step ${++i}: Adding iPhone to cart again`);
  await homePage.addProductToCartByName(productDetails.ProductiPhone);
  await page.waitForTimeout(1000);

  console.log(`Step ${++i}: Verifying cart item count after adding iPhone again`);
  cartText = await homePage.getCartTotalText();
  expect(cartText).toContain('2 item');
});

test('Verify that updating the quantity of a product in the shopping cart correctly calculates the total price', async ({ page }) => {
  const homePage = new HomePage(page);
  const viewCartPage = new ViewCartPage(page);
  let i: number = 1;

  console.log(`Step ${i}: Adding MacBook to cart`);
  await homePage.addProductToCartByName(productDetails.ProductMacBook);
  await homePage.openCartPopup();
  await homePage.clickViewCart();

  console.log(`Step ${++i}: Updating quantity to 2`);
  await viewCartPage.updateProductQuantity(productDetails.ProductMacBook, 2);
  await page.waitForTimeout(1000);

  console.log(`Step ${++i}: Getting unit price and total price`);
  const unitPriceStr = await viewCartPage.getUnitPriceByProductName(productDetails.ProductMacBook);
  const totalPriceStr = await viewCartPage.getTotalPriceByProductName(productDetails.ProductMacBook);

  console.log(`Step ${++i}: Parsing prices and verifying total price calculation`);
  const unitPrice = parseFloat(unitPriceStr.replace(/[^\d.]/g, ''));
  const totalPrice = parseFloat(totalPriceStr.replace(/[^\d.]/g, ''));
  expect(totalPrice).toBeCloseTo(unitPrice * 2);
});

test('Verify that the sum of individual product total prices matches the grand total on the shopping cart page', async ({ page }) => {
  const homePage = new HomePage(page);
  const viewCartPage = new ViewCartPage(page);
  let i: number = 1;

  console.log(`Step ${i}: Adding MacBook and iPhone to cart`);
  await homePage.addProductToCartByName(productDetails.ProductMacBook);
  await homePage.addProductToCartByName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Navigating to View Cart page`);
  await homePage.openCartPopup();
  await homePage.clickViewCart();

  console.log(`Step ${++i}: Calculating sum of product totals`);
  const productTotals = await viewCartPage.getAllProductTotalPrices();
  const sum = productTotals.reduce((a, b) => a + b, 0);

  console.log(`Step ${++i}: Getting the grand total`);
  const grandTotal = await viewCartPage.getGrandTotal();

  console.log(`Step ${++i}: Verifying the sum matches the grand total`);
  expect(sum).toBeCloseTo(grandTotal);
});

test('Verify that clicking the "Checkout" button on the shopping cart page navigates to the checkout page', async ({ page }) => {
  const homePage = new HomePage(page);
  const viewCartPage = new ViewCartPage(page);
  const checkoutPage = new CheckoutPage(page);
  let i: number = 1;

  console.log(`Step ${i}: Adding MacBook and iPhone to cart`);
  await homePage.addProductToCartByName(productDetails.ProductMacBook);
  await homePage.addProductToCartByName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Navigating to View Cart page`);
  await homePage.openCartPopup();
  await homePage.clickViewCart();

  console.log(`Step ${++i}: Clicking Checkout button`);
  await viewCartPage.clickCheckoutButton();

  console.log(`Step ${++i}: Verifying navigation to checkout page`);
  const heading = await checkoutPage.getCheckoutHeading();
  expect(heading).toContain('Checkout');
});
});