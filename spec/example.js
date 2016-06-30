var dotenv = require('dotenv').config()
console.log('uname : '+process.env.SAUCE_USERNAME)
console.log('access : '+process.env.SAUCE_ACCESS_KEY)
var webdriverio = require('webdriverio');
var should = require('should');

client = webdriverio.remote({
    desiredCapabilities: {
        browserName: 'chrome',
        version: '48.0',
        platform: 'OS X El Capitan',
        tags: ['examples'],
        name: 'This is an example test',

        // If using Open Sauce (https://saucelabs.com/opensauce/),
        // capabilities must be tagged as "public" for the jobs's status
        // to update (failed/passed). If omitted on Open Sauce, the job's
        // status will only be marked "Finished." This property can be
        // be omitted for commerical (private) Sauce Labs accounts.
        // Also see https://support.saucelabs.com/customer/portal/articles/2005331-why-do-my-tests-say-%22finished%22-instead-of-%22passed%22-or-%22failed%22-how-do-i-set-the-status-
        'public': true
    },
    host: 'ondemand.saucelabs.com',
    port: 80,
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    logLevel: 'silent'
}).init();

client
    .url('http://saucelabs.com/test/guinea-pig')
    .setValue('*[name="q"]', 'webdriverio')
    .click('*[name="btnG"]')
    .pause(1000)
    .getTitle(function(err, title) {
        (title).should.be.equal("Web Driver IO - Tutorial Test Page");
    })
    .end();