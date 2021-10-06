const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

const cp = require('child_process');
const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

const caps = {
  'browser': 'chrome', // allowed browsers are `chrome`, `edge`, `playwright-chromium`, `playwright-firefox` and `playwright-webkit`
  'os': 'osx',
  'os_version': 'catalina',
  'name': 'Codecept test using Playwright',
  'build': 'CodeceptJS on BrowserStack 2',
  'browserstack.username': process.env.BROWSERSTACK_USERNAME ,
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY ,
  'client.playwrightVersion': clientPlaywrightVersion  // example '1.11.0'
};

const caps_firefox = {
  'browser': 'playwright-firefox', // allowed browsers are `chrome`, `edge`, `playwright-chromium`, `playwright-firefox` and `playwright-webkit`
  'os': 'osx',
  'os_version': 'catalina',
  'name': 'Codecept test using Playwright',
  'build': 'CodeceptJS on BrowserStack 2',
  'browserstack.username': process.env.BROWSERSTACK_USERNAME ,
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY ,
  'client.playwrightVersion': clientPlaywrightVersion  // example '1.11.0'
};
const caps_edge = {
  'browser': 'edge', // allowed browsers are `chrome`, `edge`, `playwright-chromium`, `playwright-firefox` and `playwright-webkit`
  'os': 'osx',
  'os_version': 'catalina',
  'name': 'Codecept test using Playwright',
  'build': 'CodeceptJS on BrowserStack 2',
  'browserstack.username': process.env.BROWSERSTACK_USERNAME ,
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY ,
  'client.playwrightVersion': clientPlaywrightVersion  // example '1.11.0'
};

exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      // url: 'http://localhost',
      show: true,
      browser: 'chromium',
      chromium: {
        browserWSEndpoint: { wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}` }
      },
      firefox: {
        browserWSEndpoint: { wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps_firefox))}` }
      },
      webkit: {
        browserWSEndpoint: { wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps_edge))}` }
      }
    },
    CustomSteps: {
      require: './custom_steps.js'
    }
  },
  multiple: {
    default: {
      chunks: 10,
      browsers: [
        "chromium",
        "firefox",
        "webkit"
      ]
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'codeceptjs',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}
