import NavigateTo from '../pageobjects/navigation.page';
import QuoraLogin from '../pageobjects/quora-login';
import PartnerHomePageObject from '../pageobjects/partner-homepage.page';
import PartnerPromptsPageObject from '../pageobjects/partner-prompts.page';
const yargs = require('yargs');
const argv = yargs.argv;

describe('navigate to Quora Partner homepage and request answers on the questions that earned in last 24h', function() {
    it('should request answers of most popular questions ', function () {
        NavigateTo.thePartnersPage();
        QuoraLogin.enterCredentialsAtLoginPage(argv.userName, argv.passWord);
        browser.pause(2000);
        browser.url('https://www.quora.com/partners?sort_by=day#questions');

        let i = 0;
        while($$('div[class*="earnings_amount"]')[i].getText() != '$0.00') {
            $$('div[class*="QuestionListItem"] a[class="question_link"]')[i].scrollIntoView(false);
            let questionTitle = $$('div[class*="QuestionListItem"] a[class="question_link"]')[i].getText();
            $$('a[class*="AskToAnswerModalLink"]')[i].click();
            browser.pause(2000);
            let j = 0;
            if ($$('div[class*="ClickWrapper"] span[class="q-inlineBlock qu-verticalAlign--text-bottom"]').length > 5) {
                while (j < 5) {
                    $$('div[class*="ClickWrapper"] span[class="q-inlineBlock qu-verticalAlign--text-bottom"]')[j].scrollIntoView(false);
                    $$('div[class*="ClickWrapper"] span[class="q-inlineBlock qu-verticalAlign--text-bottom"]')[j].click();
                    browser.pause(2000);
                    j++;
                }
                console.log('Sent requests for question: ' + questionTitle);
            } else {
                console.log('Not enough people to send requests for question: ' + questionTitle)
            }
            $('span[class*="ButtonPill"]').click();
            browser.pause(2000);
            i++;
        }
    });
});