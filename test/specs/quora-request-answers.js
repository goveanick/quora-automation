import contactUs from '../pageobjects/ta-contactus.page';
import QuoraLogin from '../pageobjects/quora-login';
const yargs = require('yargs');
const argv = yargs.argv;

describe('navigate to Quora and request answers', function() {
    it('should request answers of most popular questions ', function () {
        contactUs.open();// navigating to login page
        QuoraLogin.enterCredentials(argv.userName, argv.passWord);

        let i = 0;
        while(i < 30) {
            console.log('@@@@@@@@@@@@@ THIS IS RUN NUMBER: ' + i + ' @@@@@@@@@@@@@@@@@@@@@');
            QuoraLogin.clickOnFirstViewAllSuggestionsLink();
            // QuoraLogin.clickRequestButtons();
            QuoraLogin.clickRequestButtons2();
            QuoraLogin.clickRefreshButton();
            contactUs.open();
            i++;
        }
    });
});