import { When, Then, Given, Before, After, setDefaultTimeout } from '@cucumber/cucumber'
import { By, until } from "selenium-webdriver"
import { assert } from "chai"

import { initDriver, quitDriver } from '../supports/driverUtil.js'

setDefaultTimeout(60 * 1000)

let driver

Before(async function() {
  driver = await initDriver()
})

After(async function() {
  await quitDriver(driver)
})

Given('Iam in home page', async function() {
  await driver.get("http://localhost:5173")

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
  await driver.sleep(1000)
})

Given('I click on the share button', async function() {
  const shareButton = await driver.wait(until.elementLocated(By.id('share-btn')), 10000)
  await shareButton.click();
  await driver.sleep(1000)
})

Then('I should see the new uploaded post with the content as {string}', async function(content) {
  const postContent = await driver.wait(until.elementLocated(By.id('post-content')), 10000)
  const actualPostContent = await postContent.getText()
  assert.strictEqual(actualPostContent, content)
  await driver.sleep(1000)
})
