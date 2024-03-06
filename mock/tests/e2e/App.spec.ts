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
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see a login button", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
});

// test("successful load file", async ({ page }) => {
//   // CHANGED
//   await page.goto("http://localhost:8000/");
//   await page.getByLabel("Login").click();
//   await page.getByLabel("Command input").fill("load computers");

//   await expect(page.getByText("Loaded file: computers")).toBeVisible();
// });

// test("change mode", async ({ page }) => {
//   // CHANGED
//   await page.goto("http://localhost:8000/");
//   await page.getByLabel("Login").click();
//   await page.getByLabel("Command input").fill("mode");

//   await expect(page.getByLabel("Switched to verbose mode")).toBeVisible();

//   // await page.getByLabel("Command input").fill("mode");

//   // expect(page.getByLabel("output")).toHaveText("Switched to brief mode");
// });

// test("unsuccessful command", async ({ page }) => {
//   // CHANGED
//   await page.goto("http://localhost:8000/");
//   await page.getByLabel("Login").click();
//   await page.getByLabel("Command input").fill("random");

//   await expect(page.getByLabel("output")).toHaveText(
//     "Command not found: random"
//   );
// });

test("unsuccessful load file", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load randomFile");

  expect(page.getByText("Failed to load file data for computers")).toBeVisible;
});

test("unsuccessful search, wrong file", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load computers");
  await page
    .getByLabel("Command input")
    .fill("search randomFile randomMonitor monitor");

  expect(page.getByText("Invalid file, please enter a different file name"))
    .toBeVisible;
});

test("unsuccessful search, wrong identifier", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load computers");
  await page.getByLabel("Command input").fill("search computers XDR 10");

  expect(page.getByText("Column index 10 is out of range.")).toBeVisible;
});

test("view without loading file", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("view computers");

  expect(page.getByText("Please load file before attempting to view."))
    .toBeVisible;
});

test("unsuccessful search", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load computers");
  await page.getByLabel("Command input").fill("search computers 1 2");

  expect(page.getByText("Loaded file: computers")).toBeVisible;
  expect(page.getByText('Output: No matches found for "1" in column "2"'))
    .toBeVisible;
});

test("successful search", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load computers");
  await page.getByLabel("Command input").fill("search computers 1 1");

  expect(page.getByText("Loaded file: computers")).toBeVisible;
  expect(page.getByText("Command: search computers 14 1")).toBeVisible;
  expect(page.getByText("MacOS")).toBeVisible;
  expect(page.getByText("14in")).toBeVisible;
});

test("mode", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Command input").fill("mode");

  expect(page.getByText("Switched to brief mode")).toBeVisible;
  expect(page.getByText("Switched to verbose mode")).toBeVisible;
});

test("view", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load computers");
  await page.getByLabel("Command input").fill("view computers");

  expect(page.getByText("Command: view computers")).toBeVisible;
  expect(page.getByText("Operating System")).toBeVisible;
  expect(page.getByText("MacOS")).toBeVisible;
  expect(page.getByText("Windows")).toBeVisible;
});
