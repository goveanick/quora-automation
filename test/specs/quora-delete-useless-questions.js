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
        const numberQuestionOptions = $$('span[class*="IconWrapper"] g[id="overflow"]').length;
        console.log('This is the number of questions displayed by default: ' + numberQuestionOptions);
        let i = 8;
        let numDeleted = 0;
        while (i < 240) {
            $$('span[class*="IconWrapper"] g[id="overflow"]')[i].scrollIntoView(false);

            if (i < 140) {
                console.log('Question: ' + i);
                browser.pause(1500);
                i= i +4;
            } else {
                $$('span[class*="IconWrapper"] g[id="overflow"]')[i] + $$('div[class*="q-box"] div[class*="ActionBar"] svg')[(i * 5) + 4].click();
                browser.pause(3000);
                if ($('div.display__Flex-sc-12j253u-2:nth-child(10) > div:nth-child(1) > div:nth-child(1)').getText() === 'Delete') {
                    console.log('Deleted Question # ' + i + ': ' + $$('div[class*="TitleText"]')[i].getText());
                    $('div.display__Flex-sc-12j253u-2:nth-child(10) > div:nth-child(1) > div:nth-child(1)').click();
                    browser.pause(1000);
                    $$('a[id*="submit"]')[0].click();
                    browser.pause(1500);
                    numDeleted++;
                } else {
                    console.log('Question: ' + i + ': ' + $$('div[class*="TitleText"]')[i].getText());
                }
                i++;
            }

        }
        console.log('This is the number of questions that were deleted: ' + numDeleted);

    });
});