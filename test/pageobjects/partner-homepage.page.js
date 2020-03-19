class PartnerHomepage {

    get viewAllSuggestions()                { return $$('div[class*="button_area u-text-align--center u-absolute"]'); }
    get requestAnswerBoxOnPartnerPage()     { return $('div[class*="PartnerPromptsQuestionCarouselItem"]'); }


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