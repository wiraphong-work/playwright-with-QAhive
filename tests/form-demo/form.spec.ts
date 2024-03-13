import {test , expect } from '@playwright/test'

test.beforeEach('goto',async({page})=>{
    await page.goto('form-demo')
})

test.describe('Form',()=>{
    test('Fill input' , async ({page})=>{
        await page.fill('[id="username"]' ,'testing')
        await page.fill('[name="firstname"]' ,'firstname')
        await page.locator('div').filter({ hasText: /^lastname\*$/ }).getByRole('textbox').fill('lastname');
        await page.getByTestId('male').check()
        await page.getByRole('combobox').selectOption('TH');
        await page.getByRole('checkbox').check();
        await page.getByTestId('submit').click();
        await expect(page.getByText('username: testing')).toBeVisible()
    })
    
    test('Donwload file' , async ({page})=>{
        const downloadPromise = page.waitForEvent('download');
        await page.getByText('Download file').click();
        const download = await downloadPromise;
        const result = await download.failure();
        await expect(result).toBeNull()
    })

    test('Alert' , async ({page})=>{
        page.on('dialog', async dialog => {
           await expect(dialog.type()).toContain('alert');        
           await expect(dialog.message()).toContain('Button clicked!');
           await dialog.accept();
        });
        await page.getByText('alert normal').click()  
    })

    test('Alert confirm accept' , async ({page})=>{
        page.on('dialog', async dialog => {
           await expect(dialog.type()).toContain('confirm');            
           await expect(dialog.message()).toContain('Pleasee select ok / cancel?');
           await dialog.accept();
        });  
        await page.getByText('alert confirm').click();    
    })

    test('Alert confirm dismiss' , async ({page})=>{
        page.on('dialog', async dialog => {
           await expect(dialog.type()).toContain('confirm');            
           await expect(dialog.message()).toContain('Pleasee select ok / cancel?');
           await dialog.dismiss();
        });   
        await page.getByText('alert confirm').click();
    })
    
})

