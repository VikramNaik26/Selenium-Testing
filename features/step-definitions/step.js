import { When, Then, Given, Before, After } from '@cucumber/cucumber';
import { expect } from "chai"

import { Builder, By } from "selenium-webdriver"

let driver = new Builder()
  .forBrowser('chrome')
  .build()

let sum = 0

Before(function() {
  console.log("Before")
})

After(function() {
  console.log("After")
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
