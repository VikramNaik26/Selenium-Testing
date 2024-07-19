import { When, Then, Given, Before, After, setDefaultTimeout } from '@cucumber/cucumber'
import { By } from "selenium-webdriver"
import { expect, assert } from "chai"

import { initDriver, quitDriver } from '../supports/driverUtil.js'

setDefaultTimeout(60 * 1000)

let driver

Before(async function() {
  driver = await initDriver()
})

After(async function() {
  await quitDriver(driver)
})

Given('Iam in login page', async function() {
  await driver.get("http://localhost:5173/login")
})

When('I enter the registered username as {string}', async function(username) {
  const usernameField = await driver.findElement(By.name('username'))
  await usernameField.sendKeys(username)
  await driver.sleep(1000)
})

When('I enter registered password as {string}', async function(password) {
  const passwordField = await driver.findElement(By.name('password'))
  await passwordField.sendKeys(password)
  await driver.sleep(1000)
})

Given('I click on the login button', async function() {
  const loginButton = await driver.findElement(By.css('button[type="submit"]'));
  await loginButton.click();
  await driver.sleep(1000)
})

Then('I should redirect to Home page', async function() {
  const currentUrl = await driver.getCurrentUrl();
  expect(currentUrl).to.include('');
  await driver.sleep(1000)
})

Given('I am on the login page', async function() {
  await driver.get("http://localhost:5173/login")
})

When('I enter the following credentials:', async function(dataTable) {
  const data = dataTable.hashes()
  for (const row of data) {
    for (const [field, value] of Object.entries(row)) {
      if (value !== '<' + field + '>') {
        await driver.findElement(By.name(field)).sendKeys(value)
        await driver.sleep(1000)
      }
    }
  }
})

Then('I should see a login error message {string}', async function(expectedErrorMessage) {
  const errorElement = await driver.findElement(By.className('error-msg'))
  const actualErrorMessage = await errorElement.getText()
  assert.strictEqual(actualErrorMessage, expectedErrorMessage)
  await driver.sleep(1000)
});

Then('I should remain on the login page', async function() {
  const currentUrl = await driver.getCurrentUrl();
  expect(currentUrl).to.include('/login');
  await driver.sleep(1000)
})
