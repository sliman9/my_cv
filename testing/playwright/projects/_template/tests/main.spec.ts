import { nameProces_01 } from '../library/proces_01';
import { nameProces_02 } from '../library/proces_02';
import { nameProces_03 } from '../library/proces_03';
import { test } from '@playwright/test';


test.describe('Name of the entire process', ()=>{
    let proces_01: nameProces_01;
    let proces_02: nameProces_02;
    let proces_03: nameProces_03;

    test.beforeEach(async ({ page }) => {
        proces_01 = new nameProces_01(page);
        proces_02 = new nameProces_02(page);
        proces_03 = new nameProces_03(page);
    });

    test('Logical Name', async ()=>{
    });
})