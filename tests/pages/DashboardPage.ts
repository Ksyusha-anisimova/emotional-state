import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly status: Locator;
  readonly logout: Locator;
  readonly emotionText: Locator;
  readonly emotionSubmit: Locator;
  readonly emotionMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.status = page.locator("#user-status");
    this.logout = page.locator("#logout");
    this.emotionText = page.locator("#emotion-text");
    this.emotionSubmit = page.locator("#emotion-submit");
    this.emotionMsg = page.locator("#emotion-msg");
  }

  async isVisible() {
    return this.status.isVisible();
  }

  async recognize(text: string) {
    await this.emotionText.fill(text);
    await this.emotionSubmit.click();
  }
}
