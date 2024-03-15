import { test, expect } from '@playwright/test';
import { MainPage } from '../component/global-fuction';

const data_check = [
  {
    key: 'titleEN',
    name: 'Title',
  },
  {
    key: 'firstNameEN',
    name: 'First Name',
  },
  {
    key: 'lastNameEN',
    name: 'Last Name',
  },
  {
    key: 'fullNameEN',
    name: 'Full Name',
  },
  {
    key: 'genderEN',
    name: 'Gender',
  },
  {
    key: 'dateOfBirthEN',
    name: 'Date Of Birth',
  },
  {
    key: 'age',
    name: 'Age',
  },
  {
    key: 'email',
    name: 'Email',
  },
  {
    key: 'phoneNo',
    name: 'Phone no.',
  },
  {
    key: 'citizenId',
    name: 'Citizen Id',
  },
];
let component;

test.beforeEach(async ({ page }) => {
  await page.goto('/test-data-generator');
});

test('Generate all', async ({ page }) => {
  await data_check.map(async (value) => {
    await page.check(`[name="${value.key}"]`, { force: true });
  });
  await page.getByRole('button', { name: 'generate' }).click();
  const rowTitle = await page
    .locator('.MuiDataGrid-columnHeaderTitle')
    .allTextContents();
  await expect(data_check.map((val) => val.name)).toEqual(
    expect.arrayContaining(rowTitle)
  );
});

test('Generate some', async ({ page }) => {
  component = new MainPage(page);
  await component.clearCheckbox();
  const data_random_check = await component.getRandom(
    data_check.map((val) => {
      return val.key;
    }),
    Math.floor(Math.random() * 9)
  );
  await data_random_check.map(async (value) => {
    await page.check(`[name="${value}"]`, { force: true });
  });
  await page.getByRole('button', { name: 'generate' }).click();
  const rowTitle = await page
    .locator('.MuiDataGrid-columnHeaderTitle')
    .allTextContents();
  const data_map = await data_check.filter((e) => {
    return data_random_check.includes(e.key);
  });
  await expect(data_map.map((val) => val.name)).toEqual(
    expect.arrayContaining(rowTitle)
  );
});

test('Check data records', async ({ page }) => {
  const number_random = await Math.floor(Math.random() * 25).toString();
  await page.fill('.MuiInputBase-input', number_random);
  await page.getByRole('button', { name: 'generate' }).click();
  const number_row = await page
    .locator('.MuiTablePagination-displayedRows')
    .textContent();
  await expect(number_row).toContain(number_random);
});

test('Export excel', async ({ page }) => {
  const downloadPromise = page.waitForEvent('download');
  await page.getByText('Export').click();
  await page.getByText('Download as CSV').click();
  const download = await downloadPromise;
  const result = await download.failure();
  await expect(result).toBeNull();
});
