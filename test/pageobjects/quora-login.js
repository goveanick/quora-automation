class QuoraLogin {

    get emailField()                  { return $('div[class="form_inputs"] input[id*=email]'); }
    get passwordField()               { return $('div[class="form_inputs"] input[id*=password]'); }
    get submitButton()                { return $('div[class="form_inputs"] input[id*=submit_button]'); }
    get viewAllSuggestions()          { return $$('div[class*="button_area u-text-align--center u-absolute"]'); }
    get allRequestButtons()           { return $$('div[class*="A2APromptBundle"] div[class*="item_action"]'); }
    get boxWith3QuestionsNeedingAnswers()           { return $('div[class*="A2APromptBundle"]'); }
    get popUpCloseButton()            { return $('g[id="small_close"]'); }
    get allAnswerButtons()            { return $$('div[class="WantedAnswerSuggestions"] div[id*="request_button"]'); }
    get refreshButton()               { return $('div[class*="A2APromptBundle"] div[class*="RefreshA2AQuestionListActionItem"] span[id*="label"]'); }
    get requestAnswerBoxOnPartnerPage() { return $('div[class*="PartnerPromptsQuestionCarouselItem"]'); }


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

        console.log('I\'m entering the loop, that will click on the three questions');
        let questionNumber = 1;
        for(const requestButton of this.allRequestButtons) {
            console.log('Im inside the loop');
            browser.waitUntil(() => {
                return (requestButton.isDisplayed());
            }, 30000, 'The request button for question number '+ questionNumber + ' was not displayed.\n' + browser.getUrl());
            requestButton.click();
            console.log('I\'ve clicked on question number ' + questionNumber);
            // browser.waitUntil(() => {
            //     return (this.allAnswerButtons[0].isDisplayed());
            // }, 30000, 'iframe did not load correctly: ' + browser.getUrl());
            // console.log('This is the number Im on: ' + requestButton);
            // console.log(this.allAnswerButtons.length);
            // let i = 0;
            // let maximumRequests = 5;
            // // if(this.allAnswerButtons.length < maximumRequests) {
            // //     maximumRequests = this.allAnswerButtons.length;
            // // }
            // while(i < maximumRequests){
            //     browser.waitUntil(() => {
            //         return (this.allAnswerButtons[i].isDisplayed());
            //     }, 30000, 'iframe did not load correctly: ' + browser.getUrl());
            //     this.allAnswerButtons[i].click();
            //     i++;
            // }
            browser.waitUntil(() => {
                return (this.popUpCloseButton.isDisplayed());
            }, 30000, 'The close button in the popup wasn\'t displayed' + browser.getUrl());
            this.popUpCloseButton.click();
            questionNumber++;
            browser.waitUntil(() => {
                return (this.allRequestButtons.length = 3);
            }, 30000, 'The popup was not closed and the three questions were not displayed: ' + browser.getUrl());
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
}



export default new QuoraLogin();