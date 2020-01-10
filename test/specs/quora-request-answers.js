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
        QuoraLogin.clickOnFirstViewAllSuggestionsLink();
        let i = 0;
        while(i < 10) {
            QuoraLogin.clickRequestButtons();
            QuoraLogin.clickRefreshButton();
            i++;
        }

        // QuoraLogin.clickRequestAnswerButtons();
        // browser.pause(10000);



    });
});
