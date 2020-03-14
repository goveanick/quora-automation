import Page from './page'

class NavigateTo extends Page {

    /**
     * define or overwrite page methods
     */
    thePartnersPage () {
        super.open('partners');  // this will append `partners` to the baseUrl to form complete URL
        browser.pause(2000);
    }
}

export default new NavigateTo()
