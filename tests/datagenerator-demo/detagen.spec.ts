import { test, expect } from '@playwright/test';

const data_check = [
    {
        key: 'titleEN',
        name: 'Title'
    },
    {
        key: 'firstNameEN',
        name: 'First Name'
    },
    {
        key: 'lastNameEN',
        name: 'Last Name'
    },
    {
        key: 'fullNameEN',
        name: 'Full Name'
    },
    {
        key: 'genderEN',
        name: 'Gender'
    },
    {
        key: 'dateOfBirthEN',
        name: 'Date Of Birth'
    },
    {
        key: 'age',
        name: 'Age'
    },
    {
        key: 'email',
        name: 'Email'
    },
    {
        key: 'phoneNo',
        name: 'Phone no.'
    },
    {
        key: 'citizenId',
        name: 'Citizen Id'
    },
];

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
    await expect(data_check.map((val)=> val.name)).toEqual(expect.arrayContaining(rowTitle));

    // await data_check.map(async(val,index)=>{
    //     await expect(val.name).toEqual(rowTitle[index]);
    // })
});

// test('Generate some', async ({ page }) => {
    // function getRandom(arr, n) {
    //     var result = new Array(n),
    //         len = arr.length,
    //         taken = new Array(len);
    //     if (n > len)
    //         throw new RangeError("getRandom: more elements taken than available");
    //     while (n--) {
    //         var x = Math.floor(Math.random() * len);
    //         result[n] = arr[x in taken ? taken[x] : x];
    //         taken[x] = --len in taken ? taken[len] : len;
    //     }
    //     return result;
    // }
//     const data_random_check = await getRandom(data_check.map((val)=>{return val.key}) ,  Math.floor(Math.random() * 9))
//     await console.log('data_random_check_1:',data_random_check)
//     await data_random_check.map(async (value) => {
//         await console.log('value 1:',value)
//         await page.check(`[name="${value}"]`, { force: true });
//     });
//     await page.getByRole('button', { name: 'generate' }).click();
//     const rowTitle = await page
//         .locator('.MuiDataGrid-columnHeaderTitle')
//         .allTextContents();
//     await console.log('data_random_check_2:',data_random_check)
//     await console.log('rowTitle:' , rowTitle)

//     await data_random_check.map(async(val , index)=>{
//         console.log('val:',val)
//         // await expect(val).toContain(rowTitle[index]);
//     })
//  });

test('Check data records', async ({ page }) => { 
    const number_random = await Math.floor(Math.random() * 25).toString()
    await page.fill('.MuiInputBase-input', number_random)
    await page.getByRole('button', { name: 'generate' }).click();
    const number_row = await page.locator('.MuiTablePagination-displayedRows').textContent()
    await expect(number_row).toContain(number_random)
});

test('Export excel', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('Export').click();
    await page.getByText('Download as CSV').click();
    const download = await downloadPromise;
    const result = await download.failure();
    await expect(result).toBeNull()
 });


