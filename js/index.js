// Hide and show Menu Links if logged-in or logged-out
const loggedOutLinks = $('.logged-out');
const loggedInLinks = $('.logged-in');
const userDetails = $('#userInfo');
let showTable = $('.table');
const homeView = $('#home');
const about = $('#about');
const contacts = $('#contacts');
const loginForm = $('#login');
const registerForm = $('#register');

// Routing Navigation menu
$('section').hide();
homeView.show();

$('#brand-home').on('click', function () {
    homeView.show();
    about.hide();
    contacts.hide();
    loginForm.hide();
    registerForm.hide();
})

$('#homeNav').on('click', function () {
    homeView.show();
    about.hide();
    contacts.hide();
    loginForm.hide()
    registerForm.hide()
})

$('#aboutNav').on('click', function () {
    about.show();
    contacts.hide();
    homeView.hide();
    loginForm.hide()
    registerForm.hide()
})

$('#contactsNav').on('click', function () {
    contacts.show();
    homeView.hide();
    about.hide();
    loginForm.hide();
    registerForm.hide();
})

$('#login-userNav').on('click', function () {
    loginForm.show();
    contacts.hide();
    about.hide();
    homeView.hide()
    registerForm.hide()
})

$('#registerNav').on('click', function () {
    registerForm.show();
    contacts.hide();
    loginForm.hide()
    homeView.hide()
    about.hide();
})

// login user
async function setupLogin(user) {

    if (user) {

        const userDetail = `Welcome, ${user.email}`;
        await userDetails.html(userDetail);

        loggedOutLinks.hide()
        loggedInLinks.show();
        showTable.show();
        $('#addGuide').show();
        loginForm.hide();
        registerForm.hide();
        homeView.hide();


    } else {

        loggedOutLinks.show()
        loggedInLinks.hide();
        $('#addGuide').hide()
        showTable.hide()
    }
}


// setup guides
let currentId;


async function setupGuides(data) {

    let guideData;

    let tableData = $('.table > tbody');

    if (data.length) {
        let html = '';
        let counter = 0;

        data.forEach(doc => {

            let guide = doc.data();

            currentId = doc.id; // get id-s from each tr

            guideData = `
              <tr id =${currentId}>
              <td>${counter += 1}</td>
              <td>${guide.firstNameGuide}</td>
              <td>${guide.lastNameGuide}</td>
              <td>${guide.insuranceNumberGuide}</td>
              <td><button  class="btn btn-danger" onclick="onDelete()">Delete</button></td>
              </tr>
            `;

            html += guideData;

        })

        await tableData.html(html);
        $('.table').DataTable()
    }

}

async function onDelete() {

    let deleteSuccess = $('#delete-success');

    if (confirm('Do you to delete data')) {

        if (currentId) {

            db.collection('guides').doc(currentId).delete()
                .then(() => {

                    deleteSuccess.html(`<div class="alert alert-success alert-dismissible fade show" role="alert" style="position: absolute; top: 65px; right: 20px; animation: fadeOut 1s">Successfully deleted!
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>`);

                    $(deleteSuccess).fadeOut(5000)

                }).catch(err => deleteSuccess.html(err.messsage))
        }

    } else {
        return;
    }
} 

