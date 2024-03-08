import { expect, test } from "@playwright/test";
import { MainPage } from "../component/global-fuction";

const data_test = ["test1", "test2", "test3"];
let component

test.beforeEach(async ({ page }) => {
  await page.goto("todo-list");
});

test.describe("Add list todo", async () => {
  test("add a list", async ({ page }) => {
    await page.getByPlaceholder("Add new todo").fill(data_test[0]);
    await page.getByText("submit").click();
    await expect(page.getByText(data_test[0])).toBeVisible();
  });

  test("Add many lists todo", async ({ page }) => {
    for (const list of await data_test) {
      await page.getByTestId("inputTodo").fill(list);
      await page.getByText("submit").click();
    }
  });
});

test.describe("Remove lists todo", async () => {
  test("Remove a list", async ({ page }) => {
    await page.getByTestId("markRemove").click();
    await expect(page.getByTestId("todoText")).toBeHidden();
  });

  test("Remove many lists todo", async ({ page }) => {
    component = await new MainPage(page);
    await component.addListTodo(data_test);
    for (const list of await page.getByTestId("markRemove").all()) {
      await page.getByTestId("markRemove").first().click();
    }
  });
});

test.describe("Done lists todo", async () => {
  test("Done a list", async ({ page }) => {
    await page.getByTestId("markDone").click();
    await expect(page.getByTestId("todoText")).toHaveCSS(
      "text-decoration",
      "line-through solid rgb(33, 37, 41)"
    );
  });

  test("Done many lists todo", async ({ page }) => {
    await component.addListTodo(data_test);
    for (const list of await page.getByTestId("markDone").all()) {
      await list.click();
    }
    await expect(page.getByText("This is a sampel todo")).toHaveCSS(
      "text-decoration",
      "line-through solid rgb(33, 37, 41)"
    );
    for (const list of await data_test) {
      await expect(page.getByText(list)).toHaveCSS(
        "text-decoration",
        "line-through solid rgb(33, 37, 41)"
      );
    }
  });
});
