// npm run test

const { Builder, By, Key, until } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const assert = require('chai').assert;

let driver = require('chromedriver');
const { get } = require('selenium-webdriver/http');

// Generate random user email
let timestampEmail =  Math.round(Date.now());
let emailUser = 'ivan' + timestampEmail + '@mail.bg';

const loginUser = emailUser;

// Generate random password
let timestampPassword = Math.round(Date.now());


beforeEach(async () => {

    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    await driver.get('https://test-c05c4.firebaseapp.com/');

})

afterEach(async () => {

    await driver.sleep(2500);
    await driver.quit();
})


describe('App title', async () => {


    it.skip('Check Nova Capital title is true', async () => {


        let titleName = await driver.findElement(By.id('brand-home'));
        titleName = await driver.getTitle();
        console.log('Title name:', titleName);


        let isTitle = await driver.wait(until.titleIs('Nova Capital'), 3000);
        console.log('isTitle: ', isTitle);


        assert.equal(titleName, 'Nova Capital')
        assert.isTrue(isTitle, 'Should be true')
    });

    it.skip('Navigate to Register form', async () => {


        await driver.findElement(By.id('registerNav')).click();

        //let registerFormHeader = await driver.findElement(By.xpath('//*[@id="register"]/form/h2')).getText();
        let registerFormHeader = await driver.findElement(By.css('#register > form > h2')).getText();

        assert.equal(registerFormHeader, 'Register', 'Should be equal to Register');
        assert.strictEqual(registerFormHeader, 'Register', 'Should be equal to Register');
        assert.isString(registerFormHeader, 'Should be string');
        assert.isNotEmpty(registerFormHeader, false);

    })

    it('Register a user', async() => {

       
        await driver.findElement(By.id('registerNav')).click();
        let registerEmail = await driver.findElement(By.id('registerEmail')).sendKeys(emailUser);
        let registerPassword = await driver.findElement(By.id('registerPassword')).sendKeys(timestampPassword);
        let repeatPassword = await driver.findElement(By.id('repeatPassword')).sendKeys(timestampPassword);

        console.log('emailUser: ', emailUser);
        console.log('password: ', timestampPassword);
        console.log('loginUser: ', loginUser);
    })

}); 
