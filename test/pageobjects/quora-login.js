import contactUs from './navigation.page';

class QuoraLogin {

    get emailField()                        { return $('div[class="form_inputs"] input[id*=email]'); }
    get passwordField()                     { return $('div[class="form_inputs"] input[id*=password]'); }
    get submitButton()                      { return $('div[class="form_inputs"] input[id*=submit_button]'); }
    get viewAllSuggestions()                { return $$('div[class*="button_area u-text-align--center u-absolute"]'); }
    get allRequestButtons()                 { return $$('div[class*="A2APromptBundle"] div[class*="item_action"]'); }
    get popUpCloseButton()                  { return $('g[id="small_close"]'); }
    get allAnswerButtons()                  { return $$('div[class="WantedAnswerSuggestions"] div[id*="request_button"]'); }
    get refreshButton()                     { return $('div[class*="A2APromptBundle"] div[class*="RefreshA2AQuestionListActionItem"] span[id*="label"]'); }
    get requestAnswerBoxOnPartnerPage()     { return $('div[class*="PartnerPromptsQuestionCarouselItem"]'); }
    get popupInViewPort()                   { return $('body[class*="modal_prevent_scroll"]'); }


    enterCredentialsAtLoginPage(email, password) {
        console.log('I\'m logging in');
        this.emailField.setValue(email);
        this.passwordField.setValue(password);
        this.submitButton.click();
        console.log('I\'ve logged in');
    }

    clickOnFirstViewAllSuggestionsLink() {
        console.log('I\'m on the partner homepage');
        browser.waitUntil(() => {
            return (this.requestAnswerBoxOnPartnerPage.isDisplayed());
        }, 30000, 'The box on the Partner\'s page that leads to the questions ' +
            'that needs more answers was not displayed' + browser.getUrl());
        this.viewAllSuggestions[0].click();
        console.log('I\'ve clicked on the view all suggestions button on the partner homepage');
    }


    clickRefreshButton() {
        browser.waitUntil(() => {
            return (this.refreshButton.isDisplayed());
        }, 30000, 'iframe did not load correctly: ' + browser.getUrl());
        this.refreshButton.click();
    }


    clickRequestButtons() {
        console.log('I\'m on the page that displays the three questions');
        console.log('The page with the three questions should be loaded now');
        if (this.checkIfTheThreeQuestionsAreDisplayed()) {
            this.allRequestButtons[1].click();
            console.log('I\'ve clicked on the first question');
            console.log('This is the value of the new method: ' + this.closeButtonPopUpVisible());
            if (this.closeButtonPopUpVisible() && this.popUpCloseButton.isEnabled()) {
                try {
                    this.popUpCloseButton.waitForDisplayed(30000);
                    this.popUpCloseButton.waitForExist(30000);
                    this.popUpCloseButton.waitForEnabled(30000);
                }
                catch(err) {
                    console.log('I fell into the catch, should click again');
                    contactUs.open();
                    this.clickOnFirstViewAllSuggestionsLink();
                    this.allRequestButtons[1].waitForDisplayed(30000);
                    this.allRequestButtons[1].waitForExist(30000);
                    this.allRequestButtons[1].waitForEnabled(30000);
                    this.allRequestButtons[1].click();
                    this.popUpCloseButton.waitForDisplayed(30000);
                    this.popUpCloseButton.waitForExist(30000);
                    this.popUpCloseButton.waitForEnabled(30000);
                    console.log('moving out of the catch');
                }
                finally {
                    console.log(this.allAnswerButtons.length);
                    if (this.allAnswerButtons.length > 5 && this.allAnswerButtons[0] !== undefined) {
                        let i = 0;
                        let maximumRequests = 5;
                        while(i < maximumRequests){
                            if (this.allRequestButtonsAreDisplayed(i)) {
                                console.log('I\'m in the new if statement');
                                this.allAnswerButtons[i].click();
                                i++;
                            } else {
                                console.log('Trying again! - The individual requests buttons in the modal were not displayed');
                                browser.refresh();
                                this.clickRequestButtons();
                            }
                        }
                        console.log('Sent 5 requests');
                    } else {
                        console.log('Sent 0 requests');
                    }
                    this.popUpCloseButton.click();
                    console.log('I\'ve clicked on the close button of the popup');
                }
            } else {
                console.log('Trying again! - The popup was not displayed after clicking on one of the three questions');
                browser.refresh();
                this.clickRequestButtons();
            }
        } else {
            console.log('Trying again! - The page loaded and the three questions needing answers did not load');
            browser.refresh();
            this.clickRequestButtons();
        }

    }

    allRequestButtonsAreDisplayed (i) {
        try {
            browser.waitUntil(() => {
                return (this.allAnswerButtons[i].isDisplayed());
            }, 20000, 'The individual request buttons were not clickable: ' + browser.getUrl());
            return true;
        } catch (e) {
            console.log('The individual requests buttons in the modal were not displayed');
            return false;

        }

    }
    closeButtonPopUpVisible() {
        try {
            browser.waitUntil(() => {
                return (this.popupInViewPort.isDisplayed());
            }, 10000, 'The individual request buttons were not clickable: ' + browser.getUrl());
            browser.waitUntil(() => {
                return (this.popUpCloseButton.isDisplayed());
            }, 10000, 'The individual request buttons were not clickable: ' + browser.getUrl());
            return true;
        }
        catch (err) {
            console.log('The popup wasn\'t displayed');
            return false;
        }
    }

    checkIfTheThreeQuestionsAreDisplayed() {
        try {
            this.allRequestButtons[0].waitForDisplayed(30000);
            this.allRequestButtons[1].waitForExist(30000);
            this.allRequestButtons[1].waitForEnabled(30000);
            return true;
        }
        catch (err) {
            console.log('The Three Questions that need answers were not displayed wasn\'t displayed');
            return false;
        }
    }
}



export default new QuoraLogin();
