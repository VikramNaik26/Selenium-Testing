import { When, Then, Given, Before, After, setDefaultTimeout } from '@cucumber/cucumber'
import { By, until } from "selenium-webdriver"
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

Given('Iam in home page', async function() {
  await driver.get("http://localhost:5173")
  await driver.sleep(1000)

  const usernameField = await driver.findElement(By.name('username'))
  await usernameField.sendKeys('user1')
  await driver.sleep(1000)
  const passwordField = await driver.findElement(By.name('password'))
  await passwordField.sendKeys('user1')
  await driver.sleep(1000)

  const loginButton = await driver.findElement(By.css('button[type="submit"]'))
  await loginButton.click();
  await driver.sleep(1000)
})

When('I enter the post content as {string}', async function(desc) {
  const inputElement = await driver.wait(until.elementLocated(By.id('post-desc')), 10000)
  await inputElement.sendKeys(desc)
  await driver.sleep(3000)
})

Given('I click on the share button', async function() {
  const shareButton = await driver.wait(until.elementLocated(By.id('share-btn')), 10000)
  await shareButton.click()
  await driver.sleep(2000)
})

Then('I should see the new uploaded post with the content as {string}', async function(content) {
  const postContents = await driver.wait(until.elementsLocated(By.id('post-content')), 10000)
  const mostRecentPost = postContents[0]
  const actualPostContent = await mostRecentPost.getText()
  assert.strictEqual(actualPostContent, content)
  await driver.sleep(2000)
})
