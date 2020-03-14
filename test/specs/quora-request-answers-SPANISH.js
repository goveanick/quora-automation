import contactUs from '../pageobjects/navigation.page';
import QuoraLogin from '../pageobjects/quora-login';
const yargs = require('yargs');
const argv = yargs.argv;

xdescribe('navigate to Quora in SPANISH and request answers', function() {
    it('should request answers of most popular questions ', function () {
        browser.url('https://es.quora.com/answer');
        // contactUs.open();// navigating to login page
        QuoraLogin.enterCredentials(argv.userName, argv.passWord);

        let i = 0;
        // I'm using 38 as the value here because this will run 4 times a day
        // which means ((38 questions * 5 requests) * 4 times) = 760 requests and 152 questions
        while(i < 3) {
            browser.pause(7000);
            browser.deleteCookies();
            browser.refresh();
            i++;
        }

    });
});