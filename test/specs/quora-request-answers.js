import contactUs from '../pageobjects/ta-contactus.page';
import QuoraLogin from '../pageobjects/quora-login';
const yargs = require('yargs');
const argv = yargs.argv;

describe('navigate to Quora and request answers', function() {
    it('should request answers of most popular questions ', function () {
        contactUs.open();// navigating to login page
        QuoraLogin.enterCredentials(argv.userName, argv.passWord);

        let i = 0;
        // I'm using 38 as the value here because this will run 4 times a day
        // which means ((38 questions * 5 requests) * 4 times) = 760 requests and 152 questions
        while(i < 38) {
            console.log('@@@@@@@@@@@@@ THIS IS RUN NUMBER: ' + i + ' @@@@@@@@@@@@@@@@@@@@@');
            QuoraLogin.clickOnFirstViewAllSuggestionsLink();
            // QuoraLogin.clickRequestButtons();
            QuoraLogin.clickRequestButtons3();
            QuoraLogin.clickRefreshButton();
            contactUs.open();
            i++;
        }
    });
});