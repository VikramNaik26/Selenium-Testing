import { When, Then, Given, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { By } from "selenium-webdriver"
import { expect } from "chai"

import { initDriver, quitDriver } from '../supports/driverUtil.js';

setDefaultTimeout(60 * 1000)

let sum = 0
let driver

Before(function() {
  driver = initDriver()
})

After(function() {
  quitDriver(driver)
})

When('I add {int} and {int}', function(int, int2) {
  sum = int + int2
})


Then('the result should be {int}', function(int) {
  return expect(sum).to.equal(int);
})

Given('I visit google homepage', async function() {
  await driver.get(
    'https://www.google.com/'
  )
})

When('I search for {string}', async function(string) {
  await driver.findElement(By.name('q')).sendKeys(string + '\n')
})

Then('I should see the results', async function() {
  const text = await driver.findElement(By.id('rcnt')).getText()
  console.log(text)
})
