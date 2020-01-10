class QuoraLogin {

    get emailField()                  { return $('div[class="form_inputs"] input[id*=email]'); }
    get passwordField()               { return $('div[class="form_inputs"] input[id*=password]'); }
    get submitButton()                { return $('div[class="form_inputs"] input[id*=submit_button]'); }
    get viewAllSuggestions()          { return $$('div[class*="button_area u-text-align--center u-absolute"]'); }
    get allRequestButtons()           { return $$('div[class*="A2APromptBundle"] div[class*="item_action"]'); }
    get popUpCloseButton()            { return $('g[id="small_close"]'); }
    get allAnswerButtons()            { return $$('div[class="WantedAnswerSuggestions"] div[id*="request_button"]'); }
    get refreshButton()               { return $('div[class*="A2APromptBundle"] div[class*="RefreshA2AQuestionListActionItem"] span[id*="label"]'); }


    setEmailField(email) {
        this.emailField.setValue(email);
    }

    setPasswordField(password) {
        this.passwordField.setValue(password);
    }

    enterCredentials(email, password) {
        this.emailField.setValue(email);
        this.passwordField.setValue(password);
        this.submitButton.click();
    }

    clickOnFirstViewAllSuggestionsLink() {
        browser.waitUntil(() => {
            return (this.viewAllSuggestions[0].isDisplayed());
        }, 30000, 'iframe did not load correctly: ' + browser.getUrl());
        this.viewAllSuggestions[0].click();
    }

    clickRequestButtons() {
        console.log(this.allRequestButtons.length);
        for(const requestButton of this.allRequestButtons) {
            browser.waitUntil(() => {
                return (this.allRequestButtons[0].isDisplayed());
            }, 30000, 'iframe did not load correctly: ' + browser.getUrl());
            requestButton.click();
            browser.waitUntil(() => {
                return (this.allAnswerButtons[0].isDisplayed());
            }, 30000, 'iframe did not load correctly: ' + browser.getUrl());
            console.log('This is the number Im on: ' + requestButton);
            console.log(this.allAnswerButtons.length);
            let i = 0;
            while(i < 25){
                browser.waitUntil(() => {
                    return (this.allAnswerButtons[i].isDisplayed());
                }, 30000, 'iframe did not load correctly: ' + browser.getUrl());
                this.allAnswerButtons[i].click();
                i++;
            }
            browser.waitUntil(() => {
                return (this.popUpCloseButton.isDisplayed());
            }, 30000, 'iframe did not load correctly: ' + browser.getUrl());
            this.popUpCloseButton.click()
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