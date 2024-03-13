import { Page , expect } from '@playwright/test';


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

export class ApiTesting{
  async checkKeyOfJson( responseBody: JSON ,arr: any[]) {
    await arr.forEach((val)=>{
     expect(responseBody).toHaveProperty(val);
     })
 }
}