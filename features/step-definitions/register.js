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

Given('Iam in registration page', async function() {
  await driver.get("http://localhost:5173/register")
})

When('I enter the username as {string}', async function(username) {
  const usernameField = await driver.findElement(By.name('username'))
  await usernameField.sendKeys(username)
  await driver.sleep(1000)
})

When('I enter valid email address as {string}', async function(email) {
  const emailField = await driver.findElement(By.name('email'))
  await emailField.sendKeys(email)
  await driver.sleep(1000)
})

Given('I enter password as {string}', async function(password) {
  const passwordField = await driver.findElement(By.name('password'))
  await passwordField.sendKeys(password)
  await driver.sleep(1000)
})

Given('I enter the name as {string}', async function(name) {
  const nameField = await driver.findElement(By.name('name'))
  await nameField.sendKeys(name)
  await driver.sleep(1000)
})

Given('I click on the register button', async function() {
  const registerButton = await driver.findElement(By.css('button[type="submit"]'))
  await registerButton.click();
  await driver.sleep(1000)
})

Then('I should redirect to Login page', async function() {
  const currentUrl = await driver.getCurrentUrl();
  expect(currentUrl).to.include('/login');
  await driver.sleep(1000)
})

Given('I am on the registration page', async function() {
  await driver.get("http://localhost:5173/register")
})

When('I enter the following details:', async function(dataTable) {
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

Then('I should see a register error message {string}', async function(expectedErrorMessage) {
  const errorElement = await driver.findElement(By.className('error-msg'))
  const actualErrorMessage = await errorElement.getText()
  assert.strictEqual(actualErrorMessage, expectedErrorMessage)
  await driver.sleep(1000)
})

Then('I should remain on the registration page', async function() {
  const currentUrl = await driver.getCurrentUrl();
  expect(currentUrl).to.include('/register');
  await driver.sleep(1000)
})
