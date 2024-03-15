import { Page, expect } from '@playwright/test';

export class MainPage {
  constructor(private readonly page: Page) {}

  async gotoPage() {
    await this.page.goto('todo-list');
  }

  async addListTodo(value: any[]) {
    for (const list of await value) {
      await this.page.getByTestId('inputTodo').fill(list);
      await this.page.getByText('submit').click();
    }
  }

  async getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError('getRandom: more elements taken than available');
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  async clearCheckbox() {
    // const clear_data = await [
    //   'titleEN',
    //   'firstNameEN',
    //   'lastNameEN',
    //   'email',
    //   'citizenId',
    // ];
    // await clear_data.map((val) => {
    //   this.page.click(`[name="${val}"]`);
    // });

    await this.page.click(`[name="titleEN"]`);
    await this.page.click(`[name="firstNameEN"]`);
    await this.page.click(`[name="lastNameEN"]`);
    await this.page.click(`[name="email"]`);
    await this.page.click(`[name="citizenId"]`);
  }
}

export class ApiTesting {
  async checkKeyOfJson(responseBody: JSON, arr: any[]) {
    await arr.forEach((val) => {
      expect(responseBody).toHaveProperty(val);
    });
  }
}
