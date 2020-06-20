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
        while($$('div[class*="positive"]')[i].getText() != '$0.00') {
            $$('div[class*="QuestionListItem"] a[class="question_link"]')[i].scrollIntoView(false);
            let questionTitle = $$('div[class*="QuestionListItem"] a[class="question_link"]')[i].getText();
            console.log(questionTitle.toString().indexOf('bra'));
            $$('a[class*="AskToAnswerModalLink"]')[i].click();
            browser.pause(2000);
            let j = 1;
            if ($$('div[class*="click-wrapper"] span[class="q-inlineBlock qu-verticalAlign--text-bottom"]').length > 6 && questionTitle.toString().indexOf('bra') === -1) {
                while (j < 6) {
                    $$('div[class*="click-wrapper"] span[class="q-inlineBlock qu-verticalAlign--text-bottom"]')[j].scrollIntoView(false);
                    browser.pause(1000);
                    $$('div[class*="click-wrapper"] span[class="q-inlineBlock qu-verticalAlign--text-bottom"]')[j].click();
                    browser.pause(2000);
                    j++;
                }
                console.log('Sent requests for question: ' + questionTitle);
            } else {
                console.log('Not enough people to send requests for question: ' + questionTitle);
                if (questionTitle.toString().indexOf('bra') != -1) {
                    console.log('skipped this dumb question');
                }
            }
            $('span[class*="ButtonPill"]').click();
            browser.pause(2000);
            i++;
        }
    });
});