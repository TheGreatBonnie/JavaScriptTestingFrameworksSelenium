const { devices } = require('@playwright/test')

// Playwright config to run tests on LambdaTest platform and local
const config = {
  testDir: 'tests',
  testMatch: '**/*.spec.js',
  timeout: 60000,
  use: {
    viewport: null,
    baseURL: 'https://ecommerce-playground.lambdatest.io'
  },
  projects: [
    {
      name: 'chrome:latest:MacOS Catalina@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'chrome:latest:Windows 10@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'MicrosoftEdge:90:Windows 10@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'pw-firefox:latest:Windows 10@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'pw-webkit:latest:MacOS Big sur@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    }
  ]
}

module.exports = config