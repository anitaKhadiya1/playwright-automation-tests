import { test, expect } from '@playwright/test';
import { HomePage } from '../../pageobject/HomePage';
import { ProductData } from '../../datafactory/ProductData';
 const productDetails = ProductData.getProductDetails();

test.describe('homepage', () => {

  test.beforeEach(async ({ page }) => {
    console.log('Navigating to home page');
    await page.goto('/');
});

test('Verify that adding a product to the wishlist updates the wishlist count displayed in the header', async ({ page }) => {
  const homePage = new HomePage(page);
  let i: number = 1;

  console.log(`Step ${i}: Adding MacBook to wishlist`);
  await homePage.addProductToWishlistByName(productDetails.ProductMacBook);

  console.log(`Step ${++i}: Verifying wishlist count`);
  const wishlistText = await homePage.getWishlistCountText();
  expect(wishlistText).toContain('1');
});

test('Verify that adding multiple products to the cart displays the correct product names in the cart popup', async ({ page }) => {
  const homePage = new HomePage(page);
  let i: number = 1;

  console.log(`Step ${i}: Adding MacBook and iPhone to cart`);
  await homePage.addProductToCartByName(productDetails.ProductMacBook);
  await homePage.addProductToCartByName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Opening cart popup`);
  await homePage.openCartPopup();

  console.log(`Step ${++i}: Verifying product names in cart popup`);
  const productNames = await homePage.getCartProductNames();
  expect(productNames).toContain('MacBook');
  expect(productNames).toContain('iPhone');
});

test('Verify that user can change the currencies randomly', async ({ page }) => {
  const homePage = new HomePage(page);
  let i: number = 1;

  console.log(`Step ${i}: Define available currencies and their symbols`);
  const currencies = [
    { text: '€ Euro', symbol: '€' },
    { text: '£ Pound Sterling', symbol: '£' },
    { text: '$ US Dollar', symbol: '$' }
  ];

  console.log(`Step ${++i}: Pick one at random`);
  const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)];

  console.log(`Step ${++i}: Changing currency to ${randomCurrency.text}`);
  await homePage.changeCurrencyByText(randomCurrency.text);

});

test('Verify that the total price in the cart popup is the sum of the individual product prices', async ({ page }) => {
 const homePage = new HomePage(page);
 let i: number = 1;

  console.log(`Step ${i}: Adding MacBook and iPhone to cart`);
  await homePage.addProductToCartByName(productDetails.ProductMacBook);
  await homePage.addProductToCartByName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Opening cart popup`);
  await homePage.openCartPopup();

 console.log(`Step ${++i}: Calculating sum of product prices`);
  const { sum } = await homePage.getCartProductPricesAsNumbers();

  console.log(`Step ${++i}: Getting total price from cart popup`);
  const total = await homePage.getCartTotalPrice();

  console.log(`Step ${++i}: Verifying sum matches total price`);
  expect(sum).toBeCloseTo(total);
});

test('Verify that update in the currency change the currency symbol displayed in product prices', async ({ page }) => {
  const homePage = new HomePage(page);
  let i: number = 1;

  console.log(`Step ${i}: Define available currencies and their symbols`);
  const currencies = [
    { text: '€ Euro', symbol: '€' },
    { text: '£ Pound Sterling', symbol: '£' },
    { text: '$ US Dollar', symbol: '$' }
  ];

  console.log(`Step ${++i}: Pick one at random`);
  const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)];

  console.log(`Step ${++i}: Changing currency to ${randomCurrency.text}`);
  await homePage.changeCurrencyByText(randomCurrency.text);

  console.log(`Step ${++i}: Assert the product price contains the correct symbol`);
  const priceText = await homePage.getFirstProductPriceSymbol();
  expect(priceText).toContain(randomCurrency.symbol);
});

test('Verify that adding a product into the wishlist updates the wishlist count displayed in the header', async ({ page }) => {
  const homePage = new HomePage(page);
  let i: number = 1;

  console.log(`Step ${i}: Add MacBook to wishlist`);
  await homePage.addProductToWishlistByName(productDetails.ProductMacBook);

  console.log(`Step ${++i}: Get wishlist count text from the top`);
  const wishlistText = await homePage.getWishlistCountText();

  console.log(`Step ${++i}: Verifying wishlist shows 1 item`);
  expect(wishlistText).toContain('1');
});

test('Verify that adding multiple products into the cart displays the correct product names in the cart popup', async ({ page }) => {
  const homePage = new HomePage(page);
  let i: number = 1;

  console.log(`Step ${i}: Adding MacBook and iPhone to cart`);
  await homePage.addProductToCartByName(productDetails.ProductMacBook);
  await homePage.addProductToCartByName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Opening cart popup`);
  await homePage.openCartPopup();

  console.log(`Step ${++i}: Verifying product names in cart popup`);
  const productNames = await homePage.getCartProductNames();
  expect(productNames).toContain('MacBook');
  expect(productNames).toContain('iPhone');
});

test('Verify that total price in the cart popup is the sum of the individual product prices', async ({ page }) => {
 const homePage = new HomePage(page);
 let i: number = 1;

  console.log(`Step ${i}: Adding MacBook and iPhone to cart`);
  await homePage.addProductToCartByName(productDetails.ProductMacBook);
  await homePage.addProductToCartByName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Opening cart popup`);
  await homePage.openCartPopup();

  console.log(`Step ${++i}: Calculating sum of product prices`);
  const { sum } = await homePage.getCartProductPricesAsNumbers();

  console.log(`Step ${++i}: Getting total price from cart popup`);
  const total = await homePage.getCartTotalPrice();

  console.log(`Step ${++i}: Verifying sum matches total price`);
  expect(sum).toBeCloseTo(total);
});

test('Verify that adding and then removing a product from the cart updates the cart item count displayed in the header', async ({ page }) => {
  const homePage = new HomePage(page);

  let i: number = 1;

  console.log(`Step ${i}: Adding MacBook and iPhone to cart`);
  await homePage.addProductToCartByName(productDetails.ProductMacBook);
  await homePage.addProductToCartByName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Opening cart popup`);
  await homePage.openCartPopup();

  console.log(`Step ${++i}: Verifying cart shows 2 items`);
  const cartText = await homePage.getCartTotalText();
  expect(cartText).toContain('2 item');

  console.log(`Step ${++i}: Removing iPhone from cart`);
  await homePage.removeProductFromCartByName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Verifying cart shows 1 item`);
  const updatedCartText = await homePage.getCartTotalText();
  expect(updatedCartText).toContain('1 item');
});

test('Verify that product prices displayed on the home page match the prices in the cart popup after adding products', async ({ page }) => {
  const homePage = new HomePage(page);
  let i: number = 1;

  console.log(`Step ${i}: Getting prices from home page`);
  const macBookPrice = await homePage.getProductPriceByName(productDetails.ProductMacBook);
  const iPhonePrice = await homePage.getProductPriceByName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Adding products to cart`);
  await homePage.addProductToCartByName(productDetails.ProductMacBook);
  await homePage.addProductToCartByName(productDetails.ProductiPhone);

  console.log(`Step ${++i}: Opening cart popup`);
  await homePage.openCartPopup();

  console.log(`Step ${++i}: Getting prices from cart popup`);
  const cartPrices = await homePage.getCartProductPrices();

  console.log(`Step ${++i}: Verifying prices match`);
  expect(cartPrices).toContain(macBookPrice);
  expect(cartPrices).toContain(iPhonePrice);
});

test('Verify that searching for a product displays the correct product in the search results', async ({ page }) => {
  const homePage = new HomePage(page);
  let i: number = 1;

  console.log(`Step ${i}: Searching for "iphone"`);
  await homePage.searchForProduct('iphone');

  console.log(`Step ${++i}: Verifying iPhone is displayed in search results`);
  const isIphoneVisible = await homePage.isProductDisplayed(productDetails.ProductiPhone);
  expect(isIphoneVisible).toBeTruthy();
});
});