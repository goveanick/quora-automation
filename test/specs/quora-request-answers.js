import contactUs from '../pageobjects/ta-contactus.page';
import QuoraLogin from '../pageobjects/quora-login';
const yargs = require('yargs');
const argv = yargs.argv;

/*
	This is a BDD test using Jasmine JavaScript framework
*/

describe('navigate to Quora and request answers', function() {
    it('should request answers of most popular questions ', function () {
        contactUs.open();     // navigating to login page
        QuoraLogin.enterCredentials(argv.userName, argv.passWord);

        let i = 0;
        while(i < 50) {
            QuoraLogin.clickOnFirstViewAllSuggestionsLink();
            QuoraLogin.clickRequestButtons();
            QuoraLogin.clickRefreshButton();
            contactUs.open();
            i++;
        }

        // QuoraLogin.clickRequestAnswerButtons();
        // browser.pause(10000);



    });
});