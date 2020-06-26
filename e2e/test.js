// npm run test

const { Builder, By, Key, until } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const assert = require('chai').assert;

let driver = require('chromedriver');
const { get } = require('selenium-webdriver/http');


beforeEach(async () => {

    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    await driver.get('https://test-c05c4.firebaseapp.com/');
    await driver.wait(until.urlIs('https://test-c05c4.firebaseapp.com/'), 3000)

})

afterEach(async () => {

    await driver.sleep(3000);
    await driver.close();
})


describe.skip('App title', async () => {


    it('Check Nova Capital title is true', async () => {

        let titleName = await driver.findElement(By.id('brand-home'));
        titleName = await driver.getTitle();
        console.log('Title name:', titleName);


        let isTitle = await driver.wait(until.titleIs('Nova Capital'), 3000);
        console.log('isTitle: ', isTitle);


        assert.equal(titleName, 'Nova Capital')
        assert.isTrue(isTitle, 'Should be true')
    });

    it('Check Register form is visible', async () => {


        await driver.findElement(By.id('registerNav')).click();

        let registerFormHeader = await driver.findElement(By.css('#register > form > h2')).getText();

        assert.equal(registerFormHeader, 'Register', 'Should be equal to Register');
        assert.strictEqual(registerFormHeader, 'Register', 'Should be strict equal to Register');
        assert.isString(registerFormHeader, 'Should be string');
        assert.isNotEmpty(registerFormHeader, false);

    })

    it('Check Login form is visible', async () => {

        await driver.findElement(By.id('login-userNav')).click();

        let loginFormHeader = await driver.findElement(By.css('#login > form > h2')).getText();

        assert.equal(loginFormHeader, 'Login', 'Should be equal to Login');
        assert.strictEqual(loginFormHeader, 'Login', 'Should be strict equal to Login');
        assert.isString(loginFormHeader, 'Should be string');
        assert.isNotEmpty(loginFormHeader, false);

    })

});

describe('Register user(email), login and successfully sign out', async () => {

    // Generate random user email
    let timestampEmail = Math.round(Date.now());
    let emailUser = 'ivan' + timestampEmail + '@mail.bg';

    // Generate random password
    let timestampPassword = Math.round(Date.now());

    it('Register a user suceessfully', async () => {

        await driver.findElement(By.id('registerNav')).click();
        await driver.findElement(By.id('registerEmail')).sendKeys(emailUser);
        await driver.findElement(By.id('registerPassword')).sendKeys(timestampPassword);
        await driver.findElement(By.id('repeatPassword')).sendKeys(timestampPassword);


        await driver.findElement(By.id('registerButton')).click();



        //driver.wait(async () => {
            await driver.sleep(2000);
            let userInfo = await driver.findElement(By.id("userInfo")).getText();


            assert.exists(userInfo, 'Email innerText should exists')
            assert.equal(userInfo.includes(emailUser), true);
            assert.exists(emailUser, 'Current email should exists');
       // }, 6000);


        await driver.sleep(2000);
        await driver.findElement(By.id("logout-user")).click();

        let loginNav = await driver.findElement(By.css('#login-userNav')).getText();
        let registerNav = await driver.findElement(By.css('#registerNav')).getText();
      
        assert.equal(loginNav, 'Login', 'Login navigation should be displayed');
        assert.strictEqual(loginNav, 'Login', 'Login navigation should be displayed and strict equal');
        assert.isString(loginNav, 'Login', 'Login navigation text is a String');

        assert.equal(registerNav, 'Register', 'Register navigation should be displayed');
        assert.strictEqual(registerNav, 'Register', 'Register navigation should be displayed and strict equal');
        assert.isString(registerNav, 'Register', 'Register navigation text is a String');

        assert.notInclude(userInfo, 'Email should not displayed after sign out');

    });

})