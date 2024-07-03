import { Builder } from "selenium-webdriver"

export const initDriver = () => {
  const driver = new Builder()
    .forBrowser('chrome')
    .build()

  return driver
}

export const quitDriver = (driver) => {
  driver.quit()
}
