// listen for auth status changes
const successRegister = $('#success-register');
const successLogin = $('#success-login')
const errorAddingGuide = $('.error-add-guide');
const signOutSuccess = $('#signOut-success');



auth.onAuthStateChanged(user => {

    if (user) {
        console.log(user);
        setupLogin(user);
        //get data
        db.collection('guides').onSnapshot(snapshot => {
            //console.log(snapshot.docs);

            setupGuides(snapshot.docs)
            setupLogin(user);
            $('.table').DataTable()
        })
    } else {
        console.log('User is logged out');
        setupLogin();
        setupGuides([])

    }
})

// REGISTER

let registerBtn = $('#registerButton');

registerBtn.on('click', registerUser)

async function registerUser(e) {

    e.preventDefault();
    const email = $('#registerEmail').val();
    let password = $('#registerPassword').val();
    let repeatPassword = $('#repeatPassword').val();
    let errorPasswords = $('.error-repeatPassword');
    const errorRegister = $('.error-register');

    if (password !== repeatPassword) {

        //alert('Passwords do not match')
        errorPasswords.html('Passwords do not match!')
        return;
    } else {

        // sign up the user
        auth.createUserWithEmailAndPassword(email, password).then(res => {

            console.log(res)
            console.log(res.user);
            successRegister.html(`<div class="alert alert-success alert-dismissible fade show" role="alert" style="position: absolute; top: 100px; right: 20px;">Successfully ${email} Register!
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div`);

            $(successRegister).fadeOut(5000)

            $('#register').trigger('reset');
            console.log(db.collection('guides').doc(res.user.uid));
        }).catch(err => {
            errorRegister.html(err.message)
        })
    }
}

// LOGIN
const loginUser = $('#loginButton');
loginUser.on('click', signInUser)

async function signInUser(e) {

    e.preventDefault();

    // get user info
    const email = $('#loginEmail').val();
    const password = $('#loginPassword').val();
    const errorLogin = $('.error-login');

    auth.signInWithEmailAndPassword(email, password).then(() => {
        //console.log(res);
        // console.log(res.user);
        successLogin.html(`<div class="alert alert-success alert-dismissible fade show" role="alert" style="position: absolute; top: 100px; right: 20px;">Successfully ${email} Login!
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>`);

        $(successLogin).fadeOut(5000)

        $('#login').trigger('reset');
    }).catch(err => {
        errorLogin.html(err.message);
    })
}


// LOGOUT
const logout = $('#logout-user');
logout.on('click', signOutUser);

async function signOutUser(e) {

    e.preventDefault();

    auth.signOut().then(() => {

        signOutSuccess.html(`<div class="alert alert-success alert-dismissible fade show" role="alert" style="position: absolute; top: 100px; right: 20px; animation: fadeOut 1s">Sign out Successfully!
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`);

        $(signOutSuccess).fadeOut(5000);

        document.location.href = './';

    }).catch(err => {
        signOutSuccess.html(err.message);
    })

}

// Create a new guide
const addGuideBtn = $('#addGuide button');


addGuideBtn.on('click', createNewGuide);

async function createNewGuide(e) {

    e.preventDefault();
    e.stopPropagation();

    let firstNameGuide = $('#firstNameData').val();
    let lastNameGuide = $('#lastNameData').val();
    let insuranceNumberGuide = $('#insuranceNumberData').val();
    let addedSuccess = $('#added-success');


    if (firstNameGuide !== '' && lastNameGuide !== '' && insuranceNumberGuide !== '') {

        db.collection('guides').add({
            firstNameGuide,
            lastNameGuide,
            insuranceNumberGuide,

        }).then(res => {
            console.log(res);

            addedSuccess.html(`<div class="alert alert-success alert-dismissible fade show" role="alert" style="position: absolute; top: 100px; right: 20px; animation: fadeOut 1s">${firstNameGuide} <br/> ${lastNameGuide} <br/> ${insuranceNumberGuide} <br/> Added Successfully!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`);
            $(addedSuccess).fadeOut(4000)


        }).catch(err => {
            console.log(err.message);
        })
    } else {

        errorAddingGuide.html(`<h4>Values cannot be empties!</h4>`);
        return;
    }

    $('#addGuide').trigger('reset');
}

