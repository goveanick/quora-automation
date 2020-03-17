import contactUs from '../pageobjects/navigation.page';
import QuoraLogin from '../pageobjects/quora-login';
const yargs = require('yargs');
const argv = yargs.argv;

describe('navigate to Quora in SPANISH and request answers', function() {
    it('should request answers of most popular questions ', function () {
        // browser.url('https://es.quora.com/answer');
        browser.url('https://www.quora.com/partners');
        QuoraLogin.enterCredentialsAtLoginPage(argv.userName, argv.passWord);
        browser.pause(2000);
        browser.url('https://www.quora.com/profile/Francisco-Blanco-33/questions');
        browser.pause(2000);
        const numberQuestionOptions = $$('a[aria-label="More options"]').length;
        console.log('This is the number: ' + numberQuestionOptions);
        let i = 10;
        let numDeleted = 0;
        while (i < 100) {
            console.log('in here: ' + i);
            $$('a[aria-label="More options"]')[i].scrollIntoView(false);
            if (i < 60) {
                browser.pause(1500);
                i= i +3;
            } else {
                $$('a[aria-label="More options"]')[i].click();
                browser.pause(3000);
                if ($('a[class*="delete_question"]').isDisplayed()) {
                    console.log('Question ' + i + ' has the delete option');
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


        // let i = 0;
        // // I'm using 38 as the value here because this will run 4 times a day
        // // which means ((38 questions * 5 requests) * 4 times) = 760 requests and 152 questions
        // while(i < 3) {
        //     browser.pause(7000);
        //     browser.deleteCookies();
        //     browser.refresh();
        //     i++;
        // }

    });
});