import { Page } from '@playwright/test';


export class MainPage {
    constructor(private readonly page: Page) { }

    async gotoPage() {
        await this.page.goto('todo-list');
      }

    async addListTodo(value: any[]) {
      for (const list of await value) {
        await this.page.getByTestId("inputTodo").fill(list);
        await this.page.getByText("submit").click();
      }
    }
}  