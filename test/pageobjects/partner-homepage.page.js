class PartnerHomepage {

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


    clickOnFirstViewAllSuggestionsLink() {
        console.log('I\'m on the partner homepage');
        browser.waitUntil(() => {
            return (this.requestAnswerBoxOnPartnerPage.isDisplayed());
        }, 30000, 'The box on the Partner\'s page that leads to the questions ' +
            'that needs more answers was not displayed' + browser.getUrl());
        this.viewAllSuggestions[0].click();
        console.log('I\'ve clicked on the view all suggestions button on the partner homepage');
    }
}

export default new PartnerHomepage();