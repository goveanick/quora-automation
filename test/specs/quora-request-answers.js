import NavigateTo from '../pageobjects/navigation.page';
import QuoraLogin from '../pageobjects/quora-login';
import PartnerHomePageObject from '../pageobjects/partner-homepage.page';
import PartnerPromptsPageObject from '../pageobjects/partner-prompts.page';
const yargs = require('yargs');
const argv = yargs.argv;

describe('navigate to Quora and request answers', function() {
    it('should request answers of most popular questions ', function () {
        NavigateTo.thePartnersPage();
        QuoraLogin.enterCredentialsAtLoginPage(argv.userName, argv.passWord);

        let i = 0;
        // I'm using 38 as the value here because this will run 4 times a day
        // which means ((38 questions * 5 requests) * 4 times) = 760 requests and 152 questions
        while(i < 38) {
            console.log('@@@@@@@@@@@@@ THIS IS RUN NUMBER: ' + i + ' @@@@@@@@@@@@@@@@@@@@@');
            PartnerHomePageObject.clickOnFirstViewAllSuggestionsLink();
            PartnerPromptsPageObject.clickRequestButtons();
            PartnerPromptsPageObject.clickRefreshButton();
            NavigateTo.thePartnersPage();
            i++;
        }
    });
});