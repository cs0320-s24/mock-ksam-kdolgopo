import { expect, test } from "@playwright/test";


/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
    // ... you'd put it here.
    // TODO: Is there something we need to do before every test case to avoid repeating code?
  })

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something 
 * you put before parts of your test that might take time to run, 
 * like any interaction with the page.
 */
test('on page load, i see a login button', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('on page load, i dont see the input box until login', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Command input')).not.toBeVisible()
  
  // click the login button
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel('Command input')).toBeVisible()
})

test('after I type into the input box, its text changes', async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('Awesome command');

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`
  await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
});

test('on page load, i see a button', async ({ page }) => {
  // CHANGED
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await expect(page.getByRole('button')).toBeVisible()
});


test('after I click the button, my command gets pushed', async ({ page }) => {
  // CHANGED
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('Awesome command');


  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Awesome command");
});

test("cannot type in commands without logging in", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").fill("Awesome command");

  expect(page.getByLabel("Command input")).toBeHidden();
});

test("successful load file", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load computers");

  expect(page.getByLabel("output")).toHaveText("Loaded file: computers")
});

test("unsuccessful load file", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load randomFile");

  expect(page.getByLabel("command")).toHaveText("Failed to load file data for computers");
});

test("unsuccessful search, wrong value", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load computers")
  await page.getByLabel("Command input").fill("search computers randomMonitor monitor");

  expect(page.getByLabel("command")).toHaveText(
    "Please load file before searching"
  );
});

test("unsuccessful search, wrong file", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load computers");
  await page
    .getByLabel("Command input")
    .fill("search randomFile randomMonitor monitor");

  expect(page.getByLabel("output")).toHaveText(
    "Invalid file, please enter a different file name"
  );
});

test("unsuccessful search, wrong identifier", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load computers");
  await page
    .getByLabel("Command input")
    .fill("search computers XDR randomIdentifier");

  expect(page.getByLabel("output")).toHaveText(
    "Column randomIdentifier not found in the file."
  );
});

test("unsuccessful search, wrong identifier", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load computers");
  await page
    .getByLabel("Command input")
    .fill("search computers XDR 10");

  expect(page.getByLabel("output")).toHaveText(
    "Column index 10 is out of range."
  );
});



test("view without loading file", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("view computers");

  expect(page.getByLabel("command")).toHaveText(
    "Please load file before attempting to view."
  );
});