# terminal

npx playwright test - runs all tests automatically (playwright.config.ts you can define which browsers run auto tests)
npx playwright show-report - shows report of the test that has run
npx playwright test --project=chromium - runs only chrome tests
npx playwright test --headed - runs the test headed (if default is headless)
npx playwright test example.spec.ts - only runs that specific file
npx playwright test -g "has title"  - runs only the that specific test
npx playwright test --ui - ui mode test runnner
