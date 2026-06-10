# Playwright Cheat Sheet — Simple & Beginner Friendly

await page.goto('https:pagetogoto.com); - navigate to this page
await page.click('a[href="https://demos.bellatrix.solutions/"]') - click on link
await page.locator('.namelocator').click(); - click on something without specific element naming
await page.close(); - closes page
await page.fill('#idname','whattofillin'); - fills in a locator with id which is #
await page.locator('#namebutton').click(); - click a button with an id
await page.locator('#namecheckbox').uncheck(); - uncheck a checkbox with an id
await page.getByRole('button', { name: 'namebutton'}).click(); - click on button




