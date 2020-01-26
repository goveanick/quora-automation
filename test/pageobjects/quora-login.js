import contactUs from '../pageobjects/ta-contactus.page';

class QuoraLogin {

    get emailField()                        { return $('div[class="form_inputs"] input[id*=email]'); }
    get passwordField()                     { return $('div[class="form_inputs"] input[id*=password]'); }
    get submitButton()                      { return $('div[class="form_inputs"] input[id*=submit_button]'); }
    get viewAllSuggestions()                { return $$('div[class*="button_area u-text-align--center u-absolute"]'); }
    get allRequestButtons()                 { return $$('div[class*="A2APromptBundle"] div[class*="item_action"]'); }
    get boxWith3QuestionsNeedingAnswers()   { return $('div[class*="A2APromptBundle"]'); }
    get popUpCloseButton()                  { return $('g[id="small_close"]'); }
    get allAnswerButtons()                  { return $$('div[class="WantedAnswerSuggestions"] div[id*="request_button"]'); }
    get refreshButton()                     { return $('div[class*="A2APromptBundle"] div[class*="RefreshA2AQuestionListActionItem"] span[id*="label"]'); }
    get requestAnswerBoxOnPartnerPage()     { return $('div[class*="PartnerPromptsQuestionCarouselItem"]'); }
    get popUpTitle()                        { return $('div[class*="a2a_question_text"]'); }


    setEmailField(email) {
        this.emailField.setValue(email);
    }

    setPasswordField(password) {
        this.passwordField.setValue(password);
    }

    enterCredentials(email, password) {
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

    clickRequestButtons() {
        console.log('I\'m on the page that displays the three questions');
        browser.waitUntil(() => {
            return (this.boxWith3QuestionsNeedingAnswers.isDisplayed());
        }, 30000, 'The box that displayed 3 questions needing answers was not displayed' + browser.getUrl());
        browser.waitUntil(() => {
            return (this.allRequestButtons.length = 3);
        }, 30000, 'The popup was not closed and the three questions were not displayed: ' + browser.getUrl());

        console.log('I\'m entering the loop, that will click on the three questions');
        let questionNumber = 1;
        for(const requestButton of this.allRequestButtons) {
            console.log('Im inside the loop');
            browser.waitUntil(() => {
                return (requestButton.isDisplayed());
            }, 30000, 'The request button for question number '+ questionNumber + ' was not displayed.\n' + browser.getUrl());
            // browser.pause(5000);
            requestButton.click();
            console.log('I\'ve clicked on question number ' + questionNumber);
            browser.waitUntil(() => {
                return (this.allAnswerButtons[0].isDisplayed());
            }, 30000, 'iframe did not load correctly: ' + browser.getUrl());
            console.log('This is the number Im on: ' + requestButton);
            console.log(this.allAnswerButtons.length);
            let i = 0;
            let maximumRequests = 5;
            // if(this.allAnswerButtons.length < maximumRequests) {
            //     maximumRequests = this.allAnswerButtons.length;
            // }
            while(i < maximumRequests){
                browser.waitUntil(() => {
                    return (this.allAnswerButtons[i].isDisplayed());
                }, 30000, 'iframe did not load correctly: ' + browser.getUrl());
                this.allAnswerButtons[i].click();
                i++;
            }
            browser.waitUntil(() => {
                return (this.popUpCloseButton.isDisplayed());
            }, 30000, 'The close button in the popup wasn\'t displayed' + browser.getUrl());
            this.popUpCloseButton.click();
            questionNumber++;
            browser.waitUntil(() => {
                return (this.allRequestButtons.length = 3);
            }, 30000, 'The popup was not closed and the three questions were not displayed: ' + browser.getUrl());
            // browser.pause(5000);
        }

    }

    clickRequestAnswerButtons() {
        console.log(this.allAnswerButtons.length);
        // for(const answerButton of this.allRequestButtons) {
        //     answerButton.click();
        //     browser.pause(1000);
        // }
        // for(let i = this.allRequestButtons.length - 5; i > 0; i--) {
        //     this.allRequestButtons[i].click();
        //     browser.pause(1000);
        // }

    }

    clickRefreshButton() {
        browser.waitUntil(() => {
            return (this.refreshButton.isDisplayed());
        }, 30000, 'iframe did not load correctly: ' + browser.getUrl());
        this.refreshButton.click();
    }


    clickRequestButtons2() {
        console.log('I\'m on the page that displays the three questions');
        browser.waitUntil(() => {
            return ($$('div[class*="PromptBundle"]').length > 3);
        }, 30000, 'The seven category boxes on the page did not load, instead ' + $$('div[class*="PromptBundle"]').length + ' boxes loaded\n' + browser.getUrl());
        // browser.waitUntil(() => {
        //     return (this.boxWith3QuestionsNeedingAnswers.isDisplayed());
        // }, 30000, 'The box that displayed 3 questions needing answers was not displayed' + browser.getUrl());
        browser.waitUntil(() => {
            return (this.allRequestButtons.length === 3);
        }, 30000, 'The three questions were not displayed on the page ' + browser.getUrl());

        console.log('The page with the three questions should be loaded now');
        let questionNumber = 1;

        browser.waitUntil(() => {
            return (this.allRequestButtons[1].isDisplayed());
        }, 30000, 'The request button for question number '+ questionNumber + ' was not displayed.\n' + browser.getUrl());
        browser.pause(4000);
        // browser.executeScript('arguments[0].click()',  this.allRequestButtons);
        this.allRequestButtons[1].click();
        console.log('I\'ve clicked on the first question');


        try {
            browser.waitUntil(() => {
                return (this.popUpCloseButton.isDisplayed());
            }, 10000, 'The close button in the popup wasn\'t displayed\n' + browser.getUrl());
        }
        catch(err) {
            console.log('I fell into the catch, should click again');
            contactUs.open();
            this.clickOnFirstViewAllSuggestionsLink();
            // browser.refresh();
            browser.waitUntil(() => {
                return (this.allRequestButtons[1].isDisplayed());
            }, 30000, 'The request button for question number '+ questionNumber + ' was not displayed.\n' + browser.getUrl());
            this.allRequestButtons[1].click();
            browser.waitUntil(() => {
                return (this.popUpCloseButton.isDisplayed());
            }, 30000, 'The close button in the popup wasn\'t displayed\n' + browser.getUrl());
            console.log('moving out of the catch');
        }
        finally {
            // browser.waitUntil(() => {
            //     return (this.allAnswerButtons[0].isDisplayed());
            // }, 30000, 'iframe did not load correctly: ' + browser.getUrl());
            // console.log('This is the number Im on: ' + requestButton);
            console.log(this.allAnswerButtons.length);
            if (this.allAnswerButtons.length > 1) {
                let i = 0;
                let maximumRequests = 5;
                // if(this.allAnswerButtons.length < maximumRequests) {
                //     maximumRequests = this.allAnswerButtons.length;
                // }
                while(i < maximumRequests){
                    browser.waitUntil(() => {
                        return (this.allAnswerButtons[i].isClickable());
                    }, 20000, 'The individual request buttons were not clickable: ' + browser.getUrl());
                    this.allAnswerButtons[i].click();
                    i++;
                }
                console.log('Sent 5 requests');
            } else {
                console.log('Sent 0 requests');
                browser.refresh();
                browser.waitUntil(() => {
                    return (this.allRequestButtons[1].isDisplayed());
                }, 30000, 'The request button for question number '+ questionNumber + ' was not displayed.\n' + browser.getUrl());
                this.allRequestButtons[1].click();
                if (!this.popUpCloseButton.isClickable()) {
                    browser.waitUntil(() => {
                        this.allRequestButtons[1].click();
                        return (this.popUpCloseButton.isClickable());
                    }, 20000, 'The individual request buttons were not clickable: ' + browser.getUrl());
                } else {
                    browser.waitUntil(() => {
                        return (this.popUpCloseButton.isClickable());
                    }, 20000, 'The individual request buttons were not clickable: ' + browser.getUrl());
                }
                // console.log('$$$$>>>>>>>>>>>> POPUP TITLE: ' + this.popUpTitle.getText());
            }

            this.popUpCloseButton.click();
            console.log('I\'ve clicked on the close button of the popup');
        }

    }
}



export default new QuoraLogin();