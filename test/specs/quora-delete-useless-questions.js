import QuoraLogin from '../pageobjects/quora-login';
const yargs = require('yargs');
const argv = yargs.argv;

describe('navigate to Quora partner profile', function() {
    it('should delete the questions that are not earning and have no views ', function () {
        browser.url('https://www.quora.com/partners');
        QuoraLogin.enterCredentialsAtLoginPage(argv.userName, argv.passWord);
        browser.pause(2000);
        browser.url('https://www.quora.com/profile/Francisco-Blanco-33/questions');
        browser.pause(2000);
        const numberQuestionOptions = $$('a[aria-label="More options"]').length;
        console.log('This is the number of questions displayed by default: ' + numberQuestionOptions);
        let i = 10;
        let numDeleted = 0;
        while (i < 213) {
            $$('a[aria-label="More options"]')[i].scrollIntoView(false);
            if (i < 112) {
                console.log('Question: ' + i);
                browser.pause(1500);
                i= i +3;
            } else {
                $$('a[aria-label="More options"]')[i].click();
                browser.pause(3000);
                if ($('a[class*="delete_question"]').isDisplayed()) {
                    console.log('Deleted Question # ' + i + ': ' + $$('span[class*="ui_content_title"]')[i].getText());
                    $('a[class*="delete_question"]').click();
                    browser.pause(1000);
                    $('div[id*="form_buttons"] a[class*="submit_button"]').click();
                    browser.pause(1500);
                    numDeleted++;
                }
                i++;
            }

        }
        console.log('This is the number of questions that were deleted: ' + numDeleted);

    });
});