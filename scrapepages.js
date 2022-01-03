class Scraper {
    constructor(url) {
        this.url = url;
        this.puppeteer = require('puppeteer');
        this.page = this.setPuppeteer();
        this.takeScreen();
        this.agents = this.setAgents();
        this.anencies = this.setAgencies();
        this.prices = this.setPrices();
        this.soldMethods = this.setSoldMethods();
        this.bedroomNumbers = this.setBedroomNumbers();
        this.soldDates = this.setSoldDates();
        this.addresses = this.setAddresses();
        this.allData = this.setAllData();
        // (async () => {
        //     await browser.close();
        // })();
        // (async () => { (await this.page).screenshot({ path: 'example.png' }) })();
    }
    setPuppeteer = async () => {
        const browser = await this.puppeteer.launch();
        let page = await browser.newPage();
        await page.goto(this.url, { waitUntil: 'domcontentloaded' });
        return page;
    }
    // closeBrowser

    // await browser2.close();

    printAgent = async () => {
        console.log((await this.agents));
    }

    setAllData = async () => {

        let allData = [];
        for (let i = 0; i < (await this.addresses).length; i++) {
            allData = [...allData,
            {
                address: (await this.addresses)[i],
                agent: (await this.agents)[i],
                agency: (await this.anencies)[i],
                price: (await this.prices)[i],
                bedroomNumber: (await this.bedroomNumbers)[i],
                soldDate: (await this.soldDates)[i],
                soldMethod: (await this.soldMethods)[i]
            }
            ];
        }
        return allData;
    }
    setAddresses = async () => (await this.page).evaluate(() =>
        (Array.from(document.querySelectorAll('[data-testid="listing-card-wrapper-premiumplus"] [data-testid="address-wrapper"]')).map((address) => address.innerText.replace(/\n/, " "))).filter(String)
    )
    setSoldDates = async () => (await this.page).evaluate(() =>
        (Array.from(document.querySelectorAll('[data-testid="listing-card-wrapper-premiumplus"] [data-testid="listing-card-tag"]')).map((data) => data.innerText.replace(/\n/, " ").substring(data.innerText.replace(/\n/, " ").length - 11, data.innerText.replace(/\n/, " ").length))).filter(String)
    )

    setBedroomNumbers = async () => (await this.page).evaluate(() =>
        (Array.from(document.querySelectorAll('[data-testid="listing-card-wrapper-premiumplus"] [data-testid="property-features-feature"]:first-child')).map((data) => data.innerText.replace(/\n/, " "))).filter(String)
    )
    setAgents = async () => (await this.page).evaluate(() => (
        Array.from(document.querySelectorAll('[data-testid="listing-card-branding"]>*:nth-child(2)>span:first-child, [data-testid="listing-card-branding"]>*:nth-child(1) >span:first-child')).map((agent) => agent.innerText.replace(/\n/, " "))).filter(String)
    )
    setAgencies = async () => (await this.page).evaluate(() => (
        Array.from(document.querySelectorAll('[data-testid="listing-card-wrapper-premiumplus"] [data-testid="listing-card-branding"] span:last-child')).map((data) => data.innerText.replace(/\n/, " ")))
    )
    setPrices = async () => (await this.page).evaluate(() =>
        (Array.from(document.querySelectorAll('[data-testid="listing-card-wrapper-premiumplus"] [data-testid="listing-card-price"]')).map((price) => price.innerText.replace(/\n/, " "))).filter(String)
    )
    setSoldMethods = async () => (await this.page).evaluate(() =>
        (Array.from(document.querySelectorAll('[data-testid="listing-card-wrapper-premiumplus"] [data-testid="listing-card-tag"]')).map((data) => data.innerText.replace(/\n/, " ").substring(0, data.innerText.replace(/\n/, " ").length - 11))).filter(String)
    )

    getUrl = () => this.url



    takeScreen = async () => { (await this.page).screenshot({ path: 'example.png' }) }

    // printPage = async () => {
    //     const page = await this.page;
    //     console.log(page);
    // }

}

let myScraper = new Scraper('https://www.domain.com.au/sold-listings/berwick-vic-3806/house/');

// myScraper.printAgent();

(async () => {
    console.log((await myScraper.allData));
})();

// for (let i = 1; i < 6; i++) {



//     console.log();
// }


