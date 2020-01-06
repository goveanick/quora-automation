class QuoraLogin {

    get emailField()                  { return $('div[class="form_inputs"] input[id*=email]'); }
    get passwordField()               { return $('div[class="form_inputs"] input[id*=password]'); }
    get submitButton()                { return $('div[class="form_inputs"] input[id*=submit_button]'); }
    get viewAllSuggestions()          { return $$('div[class*="button_area u-text-align--center u-absolute"]'); }
    get allRequestButtons()           { return $$('div[class*="A2APromptBundle"] div[class*="item_action"]'); }
    get popUpCloseButton()            { return $('g[id="small_close"]'); }


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
        // this.viewAllSuggestions[0].scrollIntoView();
        this.viewAllSuggestions[0].click();
    }

    clickRequestButtons() {
        console.log(this.allRequestButtons.length);
        for(const button in this.allRequestButtons) {

            this.allRequestButtons[button].click();
            browser.pause(3000);
            console.log('This is the number Im on: ' + button);
            this.popUpCloseButton.click()
        }

    }
}



export default new QuoraLogin();