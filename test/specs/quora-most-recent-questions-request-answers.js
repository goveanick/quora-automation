import NavigateTo from '../pageobjects/navigation.page';
import QuoraLogin from '../pageobjects/quora-login';
import PartnerHomePageObject from '../pageobjects/partner-homepage.page';
import PartnerPromptsPageObject from '../pageobjects/partner-prompts.page';
const yargs = require('yargs');
const argv = yargs.argv;

describe('navigate to Quora Partner homepage and request answers on the questions that I recently asked', function() {
    it('should request answers of most recent questions ', function () {
        NavigateTo.thePartnersPage();
        QuoraLogin.enterCredentialsAtLoginPage(argv.userName, argv.passWord);
        browser.pause(2000);
        browser.url('https://www.quora.com/partners?sort_by=recent#questions');


        let i = 0;
        while($$('div[class*="between"] p[class*="subtitle"]')[i].getText().includes('You asked this')) {
            $$('div[class*="QuestionListItem"] a[class="question_link"]')[i].scrollIntoView(false);
            let questionTitle = $$('div[class*="QuestionListItem"] a[class="question_link"]')[i].getText();
            $$('a[class*="AskToAnswerModalLink"]')[i].click();
            browser.pause(2000);

            let j = 1;
            if ($$('div[class*="tapHighlight"] circle ').length > 6) {

                while (j < 6) {
                    $$('div[class*="tapHighlight"] circle ')[j].scrollIntoView(false);
                    browser.pause(1000);
                    $$('div[class*="tapHighlight"] circle ')[j].click();
                    browser.pause(2000);
                    j++;
                }
                console.log('Sent requests for question: ' + questionTitle);
            } else {
                console.log('Not enough people to send requests for question: ' + questionTitle);
            }
            $('div[class*="primary_button"] span[class*="ButtonPill"]').click();
            browser.pause(2000);
            i++;
        }
    });
});