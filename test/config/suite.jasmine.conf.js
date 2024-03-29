//to use debug option run `DEBUG=true followed by your .conf.js`
const defaultTimeoutInterval  = process.env.DEBUG ? (60 * 60 * 500) : 90000;
const yargs = require('yargs');
const argv = yargs.argv;
const video = require('wdio-video-reporter');


exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',

    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // './test/specs/file-to-exclude.js'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 15,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [
      {
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 Chrome instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 5,
        browserName: 'chrome',
        'goog:chromeOptions': {
          // to run chrome headless the following flags are required
          // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
          args: ['--headless', '--disable-gpu', '--window-size=1600,1200', '--incognito'],
        }
      },

      // {
      //   // maxInstances can get overwritten per capability. So if you have an in-house Selenium
      //   // grid with only 5 firefox instances available you can make sure that not more than
      //   // 5 instances get started at a time.
      //   maxInstances: 5,
      //   browserName: 'firefox',
      //   "moz:firefoxOptions": {
      //     // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
      //     //args: ['-headless']
      //   }
      // },

      // {
      //   // maxInstances can get overwritten per capability. So if you have an in-house Selenium
      //   // grid with only 5 Safari instances available you can make sure that not more than
      //   // 5 instances get started at a time.
      //   maxInstances: 5,
      //   browserName: 'safari',
      // },

      // {
      //   // maxInstances can get overwritten per capability. So if you have an in-house Selenium
      //   // grid with only 5 IE instances available you can make sure that not more than
      //   // 5 instances get started at a time.
      //   maxInstances: 5,
      //   browserName: 'internet explorer',
      //   acceptUntrustedCertificates: true,
      //   ignoreProtectedModeSettings: true,    //only applicable to IE browser
      //   ignoreZoomSetting: true,              //only applicable to IE browser
      //   ensureCleanSession: true,
      // },
  ],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    //sync: true,
    logLevel: 'silent',     // Level of logging verbosity: silent | verbose | command | data | result | error
    //
    // Warns when a deprecated command is used
    deprecationWarnings: true,
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'http://www.quora.com/',
    waitforTimeout: 10000,            // Default timeout for all waitFor* commands.
    connectionRetryTimeout: 90000,    // Default timeout in milliseconds for request  // if Selenium Grid doesn't send response
    connectionRetryCount: 3,          // Default request retries count

    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.

    services: ['selenium-standalone'],
    // services: [browserstack'],
    // user: process.env.BROWSERSTACK_USERNAME,
    // key: process.env.BROWSERSTACK_ACCESS_KEY,
    // browserstackLocal: true,

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'jasmine',
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    // reporters: ['dot'],
    //
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        // Jasmine default timeout
        defaultTimeoutInterval: 600000000,
        //
        // The Jasmine framework allows interception of each assertion in order to log the state of the application
        // or website depending on the result. For example, it is pretty handy to take a screenshot every time
        // an assertion fails.
        expectationResultHandler: function(passed, assertion) {
            // do something
        }
    },

    reporters: [
        // [video, {
        //     saveAllVideos: false,       // If true, also saves videos for successful test cases
        //     videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
        // }],
        'spec',
        ['junit', {
            outputDir: './test/reports/junit-results/',
            outputFileFormat: function(opts) { // optional
                return `results-${opts.cid}.${opts.capabilities}.xml`
            }
          }
        ],

        ['allure', {
            outputDir: './test/reports/allure-results/',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
          }
        ],
    ],

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    beforeSession: function (config, capabilities, specs) {
      require('@babel/register');
    },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before: function (capabilities, specs) {
    },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },

    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    // beforeTest: function (test) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function () {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function () {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    afterTest: function (test) {
      if (test.error !== undefined) {
        browser.takeScreenshot();
      }
    },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}
