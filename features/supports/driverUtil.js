import { Builder } from "selenium-webdriver"

export const initDriver = async () => {
  const driver = new Builder()
    .forBrowser('chrome')
    .build()

  driver.manage().window().maximize()

  return driver
}

export const quitDriver = async (driver) => {
  if (driver) {
    await driver.quit()
    driver = null
  }
}
