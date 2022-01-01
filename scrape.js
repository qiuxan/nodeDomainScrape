const puppeteer = require('puppeteer');
const getSoldData = (async (url, urlPage2) => {
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    // const url = "https://www.domain.com.au/sold-listings/berwick-vic-3806/house/?bedrooms=4-any&excludepricewithheld=1";
    // const VIEWPORT = { width: 1360, height: 780 }
    // await page.setViewport(VIEWPORT);
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    let agents = await page.evaluate(() => (Array.from(document.querySelectorAll('[data-testid="listing-card-branding"]>*:nth-child(2)>span:first-child, [data-testid="listing-card-branding"]>*:nth-child(1) >span:first-child')).map((agent) => agent.innerText.replace(/\n/, " "))).filter(String)
    );
    let addresses = await page.evaluate(() => (Array.from(document.querySelectorAll('[data-testid="listing-card-wrapper-premiumplus"] [data-testid="address-wrapper"]')).map((address) => address.innerText.replace(/\n/, " "))).filter(String)
    );
    let prices = await page.evaluate(() => (Array.from(document.querySelectorAll('[data-testid="listing-card-wrapper-premiumplus"] [data-testid="listing-card-price"]')).map((price) => price.innerText.replace(/\n/, " "))).filter(String)
    );
    let soldDates = await page.evaluate(() => (Array.from(document.querySelectorAll('[data-testid="listing-card-wrapper-premiumplus"] [data-testid="listing-card-tag"]')).map((data) => data.innerText.replace(/\n/, " "))).filter(String)
    );
    let bedroomNumbers = await page.evaluate(() => (Array.from(document.querySelectorAll('[data-testid="listing-card-wrapper-premiumplus"] [data-testid="property-features-feature"]:first-child')).map((data) => data.innerText.replace(/\n/, " "))).filter(String)
    );

    var recentSoldData = [];

    for (let i = 0; i < soldDates.length; i++) {
        let tempInfomation = {
            address: addresses[i],
            agent: agents[i],
            price: prices[i],
            bedroomNumber: bedroomNumbers[i],
            soldDate: soldDates[i],
        };
        recentSoldData = [...recentSoldData, tempInfomation];
    }


    // console.log(agents.length + ' agents', agents, addresses.length + ' addresses:', addresses, prices.length + ' prices:', prices, soldDates.length + ' Sold Dates:', soldDates, bedroomNumbers.length + " bedroom numbers " + bedroomNumbers);
    await browser.close();
    // console.log(recentSoldData);


    const browser2 = await puppeteer.launch();


    page = await browser2.newPage();
    await page.goto(urlPage2, { waitUntil: 'domcontentloaded' });

    await page.goto(url, { waitUntil: 'domcontentloaded' });
    agents = await page.evaluate(() => (Array.from(document.querySelectorAll('[data-testid="listing-card-branding"]>*:nth-child(2)>span:first-child, [data-testid="listing-card-branding"]>*:nth-child(1) >span:first-child')).map((agent) => agent.innerText.replace(/\n/, " "))).filter(String)
    );
    addresses = await page.evaluate(() => (Array.from(document.querySelectorAll('[data-testid="listing-card-wrapper-premiumplus"] [data-testid="address-wrapper"]')).map((address) => address.innerText.replace(/\n/, " "))).filter(String)
    );
    prices = await page.evaluate(() => (Array.from(document.querySelectorAll('[data-testid="listing-card-wrapper-premiumplus"] [data-testid="listing-card-price"]')).map((price) => price.innerText.replace(/\n/, " "))).filter(String)
    );
    soldDates = await page.evaluate(() => (Array.from(document.querySelectorAll('[data-testid="listing-card-wrapper-premiumplus"] [data-testid="listing-card-tag"]')).map((data) => data.innerText.replace(/\n/, " "))).filter(String)
    );
    bedroomNumbers = await page.evaluate(() => (Array.from(document.querySelectorAll('[data-testid="listing-card-wrapper-premiumplus"] [data-testid="property-features-feature"]:first-child')).map((data) => data.innerText.replace(/\n/, " "))).filter(String)
    );

    for (let i = 0; i < soldDates.length; i++) {
        let tempInfomation = {
            address: addresses[i],
            agent: agents[i],
            price: prices[i],
            bedroomNumber: bedroomNumbers[i],
            soldDate: soldDates[i],
        };
        recentSoldData = [...recentSoldData, tempInfomation];
    }

    await browser2.close();

    console.log("There are " + recentSoldData.length + " houses recently sold :", recentSoldData);

    // console.log(agents.length + ' agents', agents, addresses.length + ' addresses:', addresses, prices.length + ' prices:', prices, soldDates.length + ' Sold Dates:', soldDates, bedroomNumbers.length + " bedroom numbers " + bedroomNumbers);

    // return recentSoldData;
})("https://www.domain.com.au/sold-listings/berwick-vic-3806/house/?bedrooms=4-any&excludepricewithheld=1", "https://www.domain.com.au/sold-listings/berwick-vic-3806/house/?bedrooms=4-any&excludepricewithheld=1&page=2");

