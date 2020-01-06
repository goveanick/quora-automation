import contactUs from '../pageobjects/ta-contactus.page';
import QuoraLogin from '../pageobjects/quora-login';

/*
	This is a BDD test using Jasmine JavaScript framework
*/

describe('navigate to Quora and request answers', function() {
    it('should request answers of most popular questions ', function () {
        contactUs.open();     // navigating to login page
        QuoraLogin.enterCredentials('Mr.BlancoWhite@outlook.com', 'Silvia1993');
        browser.pause(5000);
        QuoraLogin.clickOnFirstViewAllSuggestionsLink();
        QuoraLogin.clickRequestButtons();
        browser.pause(10000);



    });
});
