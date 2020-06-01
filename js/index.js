// Hide and show Menu Links if logged-in or logged-out
const loggedOutLinks = $('.logged-out');
const loggedInLinks = $('.logged-in');
const userDetails = $('#userInfo');
let showTable = $('.table');
const homeNav = $('#homeNav');
const homeView = $('#homeView')
const loginForm = $('#loginForm')
const registerForm = $('#registerForm')


$('section').hide()
$(homeView).show()

$(homeNav).on('click', function () {
   homeView.show();
    loginForm.hide()
    registerForm.hide()
})

$('#login-userNav').on('click', function () {
    loginForm.show()
    homeView.hide()
    registerForm.hide()
})

$('#registerNav').on('click', function () {
  registerForm.show();
    loginForm.hide()
    homeView.hide()
})


function setupLogin(user) {

    if (user) {
        // user details info
    /*    const userDetail = `Welcome, ${user.email}`;
        userDetails.html(userDetail);
        // loggedInLinks.each(item => item.css('display : block'));
        //loggedOutLinks.each(item => item.css('display : none'));
        loggedInLinks.css('display', 'block')
        loggedOutLinks.css('display', 'none')

        // show data table
        showTable.css('visibility', 'visible')

        // toggle UI without routing
        $('#loginForm').css('display', 'none');
        $('#registerForm').css('display', 'none');
        $('#addGuide').css('display', 'block'); */

        const userDetail = `Welcome, ${user.email}`;
        userDetails.html(userDetail);

        loggedOutLinks.hide()
        loggedInLinks.show();
        showTable.show();
        $('#addGuide').show();
        loginForm.hide();
        registerForm.hide();



    } else {

        loggedOutLinks.show()
        loggedInLinks.hide();
        $('#addGuide').hide()
        showTable.hide()

    }
       /* showTable.css('visibility', 'hidden');

        // loggedInLinks.forEach(item => item.style.display = 'none')
        // loggedOutLinks.forEach(item => item.style.display = 'block')
        loggedInLinks.hide()
        loggedOutLinks.show()
        //toggle UI without routing
        $('#loginForm').css('display', 'block');
        $('#registerForm').css('display', 'block');
        $('#addGuide').css('display', 'none');

    } */

}


// setup guides

let currentId;
let guideData;

async function setupGuides(data) {

    let tableData = $('.table > tbody');
    //let tableData = document.querySelector('.table > tbody')

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

        tableData.html(html);
        $('.table').DataTable()
    }

}

// $(this).closest('tr').remove();


function onDelete() {

    let deleteSuccess = $('#delete-success');

    if (confirm('Do you to delete data')) {

        if (currentId) {

            //currentId = e.target.parentElement.dataset.id

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

