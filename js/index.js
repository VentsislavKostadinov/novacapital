// Hide and show Menu Links if logged-in or logged-out
const loggedOutLinks = $('.logged-out');
const loggedInLinks = $('.logged-in');
const userDetails = $('#userInfo');
let showTable = $('.table');
const homeView = $('#home');
const about = $('#about');
const developments = $('#developments');
const loginForm = $('#login');
const registerForm = $('#register');
const novaCapitalSection = $('#welcome-nova-capital');
const locationSection = $('#location');
const footer = $('footer');


$('#brand-home').on('click', function () {
    homeView.show();
    novaCapitalSection.show();
    locationSection.show();
    footer.show();
    about.hide();
    developments.hide();
    loginForm.hide();
    registerForm.hide();

})

$('#homeNav').on('click', function () {
    homeView.show();
    novaCapitalSection.show();
    locationSection.show();
    footer.show();
    about.hide();
    developments.hide();
    loginForm.hide()
    registerForm.hide();

})

$('#aboutNav').on('click', function () {
    about.show();
    footer.show();
    developments.hide();
    homeView.hide();
    loginForm.hide();
    registerForm.hide();
    novaCapitalSection.hide();
    locationSection.hide();

})

$('#developmentsNav').on('click', function () {
    developments.show();
    footer.show();
    homeView.hide();
    about.hide();
    loginForm.hide();
    registerForm.hide();
    novaCapitalSection.hide();
    locationSection.hide();

})

$('#login-userNav').on('click', function () {

    loginForm.show();
    footer.hide();
    developments.hide();
    about.hide();
    homeView.hide()
    registerForm.hide()
    novaCapitalSection.hide();
    locationSection.hide();

})

$('#registerNav').on('click', function () {
    registerForm.show();
    footer.hide();
    developments.hide();
    loginForm.hide()
    homeView.hide()
    about.hide();
    novaCapitalSection.hide();
    locationSection.hide();
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
        novaCapitalSection.hide();
        locationSection.hide();
        footer.hide();
        $('#navbarNav > ul.navbar-nav.mx-auto > li:nth-child(4) > a').css('visibility', 'hidden');


    } else {
        loggedOutLinks.show()
        loggedInLinks.hide();
        $('#addGuide').hide()
        showTable.hide()
        footer.show();

    }
}

// Routing Navigation menu
 $('section').hide();
//homeView.show();
//novaCapitalSection.show();
//locationSection.show();
//footer.show();

// setup guides
let currentId;
async function setupGuides(data) {
    let tableData = $('.table > tbody');

    if (data.length) {
        let dataOutput = '';
        let counter = 0;

        data.forEach(doc => {

            let guide = doc.data();
            currentId = doc.id; // get id-s from each tr

            let guideData = `
              <tr id =${currentId}>
              <td>${counter += 1}</td>
              <td>${guide.firstNameGuide}</td>
              <td>${guide.lastNameGuide}</td>
              <td>${guide.insuranceNumberGuide}</td>
              <td><button class="btn btn-danger" data-toggle="modal" data-target="#deleteConfirmation">Delete</button></td>
              </tr>
            `;

            dataOutput += guideData;

            // Search data in the table
            $('#searchData').on('keyup', function () {

                let value = $(this).val().toLowerCase();
                $('.table > tbody tr').filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                })

                //let deleteCurrentId = $('.table tbody tr').closest('.table tbody tr').attr('id');

            })

        })

        tableData.html(dataOutput);

        $('.btn-danger').on('click', function () {


            let deleteSuccess = $('#delete-success');
            let deleteCurrentId = $(this).closest('.table tbody tr').attr('id');

            $('.btn-warning').on('click', async function () {

                db.collection('guides').doc(deleteCurrentId).delete()
                    .then(() => {
                        deleteSuccess.html(`<div class="alert alert-success alert-dismissible fade show" role="alert" style="position: absolute; top: 150px; right: 20px; animation: fadeOut 1s">Successfully deleted!
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>`);
                        $('.modal').modal('hide');
                        $(deleteSuccess).fadeOut(5000);

                    }).catch(err => deleteSuccess.html(err.messsage))
            })
        })
    }
}

