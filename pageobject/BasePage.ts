import { Page, Locator } from "@playwright/test";

export class BasePage {
  constructor(public page: Page) { }

  // Click on an element using a selector or Locator
  clickOn = async (locator: string) => {
  const element = this.page.locator(locator);
  // Click the element
  await element.click();

};

  // Fill text into an input using a selector or Locator
  enterText = async (selector: string | Locator, text: string) => {
    if (typeof selector === "string") {
      await this.page.locator(selector).fill(text);
    } else {
      await selector.fill(text);
    }
  };

  // Get text content from an element using a selector or Locator
  getText = async (selector: string | Locator): Promise<string | null> => {
    if (typeof selector === "string") {
      return await this.page.locator(selector).textContent();
    } else {
      return await selector.textContent();
    }
  };

  // Scroll to an element using a selector or Locator
  scrollToElement = async (selector: string | Locator) => {
    if (typeof selector === "string") {
      await this.page.locator(selector).scrollIntoViewIfNeeded();
    } else {
      await selector.scrollIntoViewIfNeeded();
    }
  };
}