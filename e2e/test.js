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

    // Generate values for table data

    let addFirstName = 'pesho' + timestampEmail;
    let addLastName = 'peshov' + timestampEmail;
    let addInsuranceNumber = timestampEmail;

    it.skip('Register a user and sign out suceessfully', async () => {

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

        // sign out
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

    it.skip('Login user and sign out successfully', async () => {

        // Login
        await driver.findElement(By.id('login-userNav')).click();
        await driver.findElement(By.id('loginEmail')).sendKeys(emailUser);
        await driver.findElement(By.id('loginPassword')).sendKeys(timestampPassword);
        await driver.findElement(By.id('loginButton')).click();

        await driver.sleep(2000);
        let userLoginInfo = await driver.findElement(By.id("userInfo")).getText();

        // assert login successfull
        assert.exists(userLoginInfo, 'Email innerText should exists')
        assert.equal(userLoginInfo.includes(emailUser), true);
        assert.exists(emailUser, 'Current email should exists');

        // sign out
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

        assert.notInclude(userLoginInfo, 'Email should not displayed after sign out');

    });

    /* CHECK sendKeys later */
    it.skip('Adding data in the table', async () => {

        // Login
        await driver.findElement(By.id('login-userNav')).click();
        await driver.findElement(By.id('loginEmail')).sendKeys('venk@abv.bg');
        await driver.findElement(By.id('loginPassword')).sendKeys('123456');
        await driver.findElement(By.id('loginButton')).click();

        // assert login successfull
        await driver.sleep(2000);
        // let userLoginInfo = await driver.findElement(By.id("userInfo")).getText();

        //assert.exists(userLoginInfo, 'Email innerText should exists')
        // assert.equal(userLoginInfo.includes(emailUser), true);
        // assert.exists(emailUser, 'Current email should exists');

        // Adding data in the table
        let inputFirstNameData = await driver.findElement(By.id('firstNameData')).sendKeys(addFirstName);
        let inputLastNameData = await driver.findElement(By.id('lastNameData')).sendKeys(addLastName);
        let inputInsuranceNumberData = await driver.findElement(By.id('insuranceNumberData')).sendKeys(addInsuranceNumber);


        inputFirstNameData = await driver.findElement(By.id('firstNameData')).getAttribute('value');
        inputLastNameData = await driver.findElement(By.id('lastNameData')).getAttribute('value');
        inputInsuranceNumberData = await driver.findElement(By.id('insuranceNumberData')).getAttribute('value');

        await driver.findElement(By.css('#addGuide > div.col.text-center > button')).click();

        // table data
        let tableData = await driver.findElement(By.css('.table > tbody')).getText();

        inputInsuranceNumberData = Number(inputInsuranceNumberData);

        // assert input values BY TYPE - POSITIVE
        assert.isString(addFirstName, 'First Name should be a String');
        assert.isString(addLastName, 'Last Name should be a String');
        assert.isNumber(addInsuranceNumber, 'Insurance Number should be a Number');

        // assert input values BY TYPE - NEGATIVE
        assert.isNotNumber(addFirstName, 'Should be a String');
        assert.isNotNumber(addLastName, 'Should be a String');
        assert.isNotString(addInsuranceNumber, 'Should be a Number');

        // assert input values if they are NULL
        assert.isNotNull(addFirstName, 'Should not be a null');
        assert.isNotNull(addLastName, 'Should not be a null');
        assert.isNotNull(addInsuranceNumber, 'Should not be a null');

        // assert input values if they are UNDEFINED
        assert.isDefined(addFirstName, 'Fist name should be defined');
        assert.isDefined(addLastName, 'Last name should be defined');
        assert.isDefined(addInsuranceNumber, 'Insurance number should be defined');

        // assert added values BY TYPE - POSITIVE
        assert.isString(inputFirstNameData, 'Should be a String');
        assert.isString(inputLastNameData, 'Should be a String');
        assert.isNumber(inputInsuranceNumberData, 'Should be a Number');

        // assert added values BY TYPE - NEGATIVE
        assert.isNotNumber(inputFirstNameData, 'Should be a String');
        assert.isNotNumber(inputLastNameData, 'Should be a String');
        assert.isNotString(inputInsuranceNumberData, 'Should be a Number');

        // assert input values if they are NULL
        assert.isNotNull(inputFirstNameData, 'Should not be a null');
        assert.isNotNull(inputLastNameData, 'Should not be a null');
        assert.isNotNull(inputInsuranceNumberData, 'Should not be a null');

        // assert added values if they are UNDEFINED
        assert.isDefined(inputFirstNameData, 'Fist name should be defined');
        assert.isDefined(inputLastNameData, 'Last name should be defined');
        assert.isDefined(inputInsuranceNumberData, 'Insurance number should be defined');

        // assert input values data with added values in the table
        assert.strictEqual(inputFirstNameData, addFirstName, 'input First name value and added First name value in the table should be equal');
        assert.strictEqual(inputLastNameData, addLastName, 'input Last name value and added Last name value in the table should be equal');
        assert.strictEqual(inputInsuranceNumberData, addInsuranceNumber, 'input Insurance number value and added Insurance number value in the table should be equal');

        // assert whether the table incluces all the values data
        assert.equal(tableData.includes(inputFirstNameData), true);
        assert.equal(tableData.includes(inputLastNameData), true);
        assert.equal(tableData.includes(inputInsuranceNumberData), true);

        // sign out
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

        let userLoginInfo = await driver.findElement(By.id("userInfo")).getText();
        assert.notInclude(userLoginInfo, 'Email should not displayed after sign out');


    })

    /* CHECK sendKeys later */
    it.skip('Search for currently added values in the table', async () => {

        // Login
        await driver.findElement(By.id('login-userNav')).click();
        await driver.findElement(By.id('loginEmail')).sendKeys('venk@abv.bg');
        await driver.findElement(By.id('loginPassword')).sendKeys('123456');
        await driver.findElement(By.id('loginButton')).click();

        // assert login successfull
        await driver.sleep(2000);
        // let userLoginInfo = await driver.findElement(By.id("userInfo")).getText();

        //assert.exists(userLoginInfo, 'Email innerText should exists')
        // assert.equal(userLoginInfo.includes(emailUser), true);
        // assert.exists(emailUser, 'Current email should exists');

        // Adding data in the table
        let inputFirstNameData = await driver.findElement(By.id('firstNameData')).sendKeys(addFirstName);
        let inputLastNameData = await driver.findElement(By.id('lastNameData')).sendKeys(addLastName);
        let inputInsuranceNumberData = await driver.findElement(By.id('insuranceNumberData')).sendKeys(addInsuranceNumber);


        inputFirstNameData = await driver.findElement(By.id('firstNameData')).getAttribute('value');
        inputLastNameData = await driver.findElement(By.id('lastNameData')).getAttribute('value');
        inputInsuranceNumberData = await driver.findElement(By.id('insuranceNumberData')).getAttribute('value');

        await driver.findElement(By.css('#addGuide > div.col.text-center > button')).click();

        // table data
        let tableData = await driver.findElement(By.css('.table > tbody')).getText();

        inputInsuranceNumberData = Number(inputInsuranceNumberData);

        // assert input values BY TYPE - POSITIVE
        assert.isString(addFirstName, 'First Name should be a String');
        assert.isString(addLastName, 'Last Name should be a String');
        assert.isNumber(addInsuranceNumber, 'Insurance Number should be a Number');

        // assert input values BY TYPE - NEGATIVE
        assert.isNotNumber(addFirstName, 'Should be a String');
        assert.isNotNumber(addLastName, 'Should be a String');
        assert.isNotString(addInsuranceNumber, 'Should be a Number');

        // assert input values if they are NULL
        assert.isNotNull(addFirstName, 'Should not be a null');
        assert.isNotNull(addLastName, 'Should not be a null');
        assert.isNotNull(addInsuranceNumber, 'Should not be a null');

        // assert input values if they are UNDEFINED
        assert.isDefined(addFirstName, 'Fist name should be defined');
        assert.isDefined(addLastName, 'Last name should be defined');
        assert.isDefined(addInsuranceNumber, 'Insurance number should be defined');

        // assert added values BY TYPE - POSITIVE
        assert.isString(inputFirstNameData, 'Should be a String');
        assert.isString(inputLastNameData, 'Should be a String');
        assert.isNumber(inputInsuranceNumberData, 'Should be a Number');

        // assert added values BY TYPE - NEGATIVE
        assert.isNotNumber(inputFirstNameData, 'Should be a String');
        assert.isNotNumber(inputLastNameData, 'Should be a String');
        assert.isNotString(inputInsuranceNumberData, 'Should be a Number');

        // assert input values if they are NULL
        assert.isNotNull(inputFirstNameData, 'Should not be a null');
        assert.isNotNull(inputLastNameData, 'Should not be a null');
        assert.isNotNull(inputInsuranceNumberData, 'Should not be a null');

        // assert added values if they are UNDEFINED
        assert.isDefined(inputFirstNameData, 'Fist name should be defined');
        assert.isDefined(inputLastNameData, 'Last name should be defined');
        assert.isDefined(inputInsuranceNumberData, 'Insurance number should be defined');

        // assert input values data with added values in the table
        assert.strictEqual(inputFirstNameData, addFirstName, 'input First name value and added First name value in the table should be equal');
        assert.strictEqual(inputLastNameData, addLastName, 'input Last name value and added Last name value in the table should be equal');
        assert.strictEqual(inputInsuranceNumberData, addInsuranceNumber, 'input Insurance number value and added Insurance number value in the table should be equal');

        // assert whether the table incluces all the values data
        assert.equal(tableData.includes(inputFirstNameData), true);
        assert.equal(tableData.includes(inputLastNameData), true);
        assert.equal(tableData.includes(inputInsuranceNumberData), true);

        // Search the added data by last name - for example
        await driver.sleep(2000);

        await driver.findElement(By.id('searchData')).sendKeys(inputLastNameData);
        assert.deepInclude(tableData, inputLastNameData, 'Search should show inputed last name data');


        // sign out
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

        let userLoginInfo = await driver.findElement(By.id("userInfo")).getText();
        assert.notInclude(userLoginInfo, 'Email should not displayed after sign out');

    })

    it('Delete current row from table data', async () => {

        // Login
        await driver.findElement(By.id('login-userNav')).click();
        await driver.findElement(By.id('loginEmail')).sendKeys('venk@abv.bg');
        await driver.findElement(By.id('loginPassword')).sendKeys('123456');
        await driver.findElement(By.id('loginButton')).click();

        // assert login successfull
        await driver.sleep(2000);
        // let userLoginInfo = await driver.findElement(By.id("userInfo")).getText();

        //assert.exists(userLoginInfo, 'Email innerText should exists')
        // assert.equal(userLoginInfo.includes(emailUser), true);
        // assert.exists(emailUser, 'Current email should exists');

        // Adding data in the table
        let inputFirstNameData = await driver.findElement(By.id('firstNameData')).sendKeys(addFirstName);
        let inputLastNameData = await driver.findElement(By.id('lastNameData')).sendKeys(addLastName);
        let inputInsuranceNumberData = await driver.findElement(By.id('insuranceNumberData')).sendKeys(addInsuranceNumber);


        inputFirstNameData = await driver.findElement(By.id('firstNameData')).getAttribute('value');
        inputLastNameData = await driver.findElement(By.id('lastNameData')).getAttribute('value');
        inputInsuranceNumberData = await driver.findElement(By.id('insuranceNumberData')).getAttribute('value');

        await driver.findElement(By.css('#addGuide > div.col.text-center > button')).click();

        // table data
        let tableData = await driver.findElement(By.css('.table > tbody')).getText();

        inputInsuranceNumberData = Number(inputInsuranceNumberData);

        // assert input values BY TYPE - POSITIVE
        assert.isString(addFirstName, 'First Name should be a String');
        assert.isString(addLastName, 'Last Name should be a String');
        assert.isNumber(addInsuranceNumber, 'Insurance Number should be a Number');

        // assert input values BY TYPE - NEGATIVE
        assert.isNotNumber(addFirstName, 'Should be a String');
        assert.isNotNumber(addLastName, 'Should be a String');
        assert.isNotString(addInsuranceNumber, 'Should be a Number');

        // assert input values if they are NULL
        assert.isNotNull(addFirstName, 'Should not be a null');
        assert.isNotNull(addLastName, 'Should not be a null');
        assert.isNotNull(addInsuranceNumber, 'Should not be a null');

        // assert input values if they are UNDEFINED
        assert.isDefined(addFirstName, 'Fist name should be defined');
        assert.isDefined(addLastName, 'Last name should be defined');
        assert.isDefined(addInsuranceNumber, 'Insurance number should be defined');

        // assert added values BY TYPE - POSITIVE
        assert.isString(inputFirstNameData, 'Should be a String');
        assert.isString(inputLastNameData, 'Should be a String');
        assert.isNumber(inputInsuranceNumberData, 'Should be a Number');

        // assert added values BY TYPE - NEGATIVE
        assert.isNotNumber(inputFirstNameData, 'Should be a String');
        assert.isNotNumber(inputLastNameData, 'Should be a String');
        assert.isNotString(inputInsuranceNumberData, 'Should be a Number');

        // assert input values if they are NULL
        assert.isNotNull(inputFirstNameData, 'Should not be a null');
        assert.isNotNull(inputLastNameData, 'Should not be a null');
        assert.isNotNull(inputInsuranceNumberData, 'Should not be a null');

        // assert added values if they are UNDEFINED
        assert.isDefined(inputFirstNameData, 'Fist name should be defined');
        assert.isDefined(inputLastNameData, 'Last name should be defined');
        assert.isDefined(inputInsuranceNumberData, 'Insurance number should be defined');

        // assert input values data with added values in the table
        assert.strictEqual(inputFirstNameData, addFirstName, 'input First name value and added First name value in the table should be equal');
        assert.strictEqual(inputLastNameData, addLastName, 'input Last name value and added Last name value in the table should be equal');
        assert.strictEqual(inputInsuranceNumberData, addInsuranceNumber, 'input Insurance number value and added Insurance number value in the table should be equal');

        // assert whether the table incluces all the values data
        assert.equal(tableData.includes(addFirstName), true);
        assert.equal(tableData.includes(addLastName), true);
        assert.equal(tableData.includes(addInsuranceNumber), true);

        // Search the added data by last name - for example
        await driver.sleep(3000);
        await driver.findElement(By.id('searchData')).sendKeys(inputLastNameData);

        // delete added values from table data
        await driver.sleep(2000);
        await driver.findElement(By.css('.table > tbody .btn-danger')).click();



        // confirm delete
        await driver.sleep(1000);
        await driver.findElement(By.css('.modal .btn-warning')).click();

        assert.notEqual(tableData.includes(inputLastNameData), false);
      


    })

})