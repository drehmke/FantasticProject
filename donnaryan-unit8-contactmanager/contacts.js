/* ---- Global Variables ---------------------------------------------------- */
var contacts = [];
var tdColSpan = 5;
var storage = 'contacts';
var storageEdit = 'edit';
var storageDel = 'delete';
var groupName = "Group";
var classFail = 'has-error';

var txtNoContacts = "There are no contacts. You should go make some friends. Use the 'Add A Contact' link to add one of your new friends!";
var txtErrorReq   = 'Please enter a first and last name for your contact, so you know who they are!';
var txtErrorFname = 'Please enter a first name for this contact';
var txtErrorLname = 'Please enter a last name for this contact';
var txtErrorPhone = 'The number provided was not the correct format. Please add it in as 333-333-4444';
var txtErrorEmail = 'The email address provided was not in the correct format. Please use the format email@address.com';
var txtErrorState = 'Please only enter two letters for your state.';
var txtErrorZip   = 'Please make sure your zip code is 5 numbers.';
var txtSelectContact = 'Select A Contact';

/* ---- The Fun Stuff! ------------------------------------------------------ */
if( localStorage.contacts ) { contacts = JSON.parse(localStorage.contacts); }
console.log( "Contacts length: " + contacts.length);
var bod = document.body.getAttribute('id');
switch(bod)
{
  case "contactHome": // Home Page ---------------------------------------------
    var rows = '';
    if( contacts.length != 0 ) {
      for( var i = 0; i < contacts.length; i++ ){
        var contact = contacts[i];
        var tr =  '<tr id="row'+contact.id+'"><td class="text-center"><button class="btn btn-default btn-sm editContact edid'+contact.id+'"><i class="fa fa-user editContact edid'+contact.id+'" aria-hidden="true"></i></button></td>';
        tr += '<td>' + contact.fname + ' ' + contact.lname + '</td>';
        tr += '<td>' + contact.phone + '</td>';
        tr += '<td>' + contact.email + '</td>';
        tr += '<td class="text-center"><button class="btn btn-default btn-sm editContact edid'+contact.id+'"><i class="fa fa-pencil editContact edid'+contact.id+'" aria-hidden="true"></i></button> ';
        tr += '<button class="btn btn-default btn-sm delContact delid'+contact.id+'"><i class="fa fa-times delContact delid'+contact.id+'" aria-hidden="true"></i></button></td>';
        tr += '</tr>';
        rows += tr;
      }
      document.getElementById('contactList').innerHTML = rows;

      document.getElementById('contactList').addEventListener('click', function(e){
        e.preventDefault();
        if( $(e.target).hasClass('editContact') ) {
          var id = findId( e.target, 'edit');
          localStorage.setItem(storageEdit, id);
          location.assign('edit.html');
        } else if ( $(e.target).hasClass('delContact') ) {
          var id = findId( e.target, 'delete');
          localStorage.setItem(storageDel, id);
          location.assign('delete.html');
        }
      })

    } else {
      var display = "<tr><td colspan="+tdColSpan+" class='text-center'>"+txtNoContacts+"</td></tr>";
      $('#contactList').html(display);
    }
    break;
  case "contactAdd": // Add A Contact ------------------------------------------
    $('#addContact').ready(function(){
      $('#fname').focus();
    })
    // Validations
    validateFields();

    $('#lname').on('blur', function(e){
      if( $('fname').val() != '' && $('lname').val() != '' )
      {
        if( document.getElementById('errorForm').innerHTML != '') {
          document.getElementById('errorForm').style.display = "none";
          document.getElementById('errorForm').innerHTML = '';
        }
      }
    })

    // Everything's cool, add our contact
    $('#addContact').submit(function(e){
      e.preventDefault();

      if( $('fname').val() != '' && $('lname').val() != ''  ) {
        var newContact = new Contact( $('#fname').val(), $('#lname').val(), $('#phone').val(), $('#email').val(), $('#street').val(), $('#city').val(), $('#state').val(), $('#zip').val() );
        contacts.push(newContact);
        var prep = JSON.stringify(contacts);
        localStorage.setItem(storage, prep);

        location.replace('index.html');
      } else {
        document.getElementById('errorForm').innerHTML = txtErrorReq;
        document.getElementById('errorForm').style.display = 'block';
      }
    })

    break;
  case "contactEdit": // Edit Contact ------------------------------------------
    var editID;
    if( localStorage.getItem(storageEdit) ) {
      editID = localStorage.getItem(storageEdit);
      fillOutContact(editID, 'edit');
    } else {
      // we don't have a stored edit id, show a select of all the contacts
      var select = buildContactSelect('selectEdit');
      $('#editSelect').append(select);

      var editSelect = document.getElementById('selectEdit');
      editSelect.addEventListener('change', function(e){
        e.preventDefault();
        editID = editSelect.value
        fillOutContact(editID, 'edit');
        localStorage.setItem(storageEdit, editID);
      })
    }

    validateFields();
    // Step 2 - Update the object - we should still have the edit ID in localStorage
    $('#editContact').submit(function(e){
      e.preventDefault();
      for( var i = 0; i < contacts.length; i++ ) {
        if( contacts[i].id == editID ) {
          // compare everything and only update what changed
          if( contacts[i].fname != $('#fname').val() )    { contacts[i].fname = $('#fname').val(); console.log('Updating ' + contacts[i].fname + ' to ' +  $('#fname').val());}
          if( contacts[i].lname != $('#lname').val() )    { contacts[i].lname = $('#lname').val(); console.log('Updating ' + contacts[i].lname + ' to ' +  $('#lname').val());}
          if( contacts[i].phone != $('#phone').val() )    { contacts[i].phone = $('#phone').val(); console.log('Updating ' + contacts[i].phone + ' to ' +  $('#phone').val());}
          if( contacts[i].email != $('#email').val() )    { contacts[i].email = $('#email').val(); console.log('Updating ' + contacts[i].email + ' to ' +  $('#email').val());}
          if( contacts[i].street != $('#street').val() )  { contacts[i].street = $('#street').val(); console.log('Updating ' + contacts[i].street + ' to ' +  $('#street').val());}
          if( contacts[i].city != $('#city').val() )      { contacts[i].city = $('#city').val(); console.log('Updating ' + contacts[i].city + ' to ' +  $('#city').val());}
          if( contacts[i].state != $('#state').val() )    { contacts[i].state = $('#state').val(); console.log('Updating ' + contacts[i].state + ' to ' +  $('#state').val());}
          if( contacts[i].zip != $('#zip').val() )        { contacts[i].zip = $('#zip').val(); console.log('Updating ' + contacts[i].zip + ' to ' +  $('#zip').val());}
        }
      }
      console.log(contacts);
      var update = JSON.stringify(contacts);
      localStorage.setItem(storage, update);
      // delete from localStorage so we don't have random edits
      if( localStorage.getItem(storageEdit) ) { localStorage.removeItem(storageEdit); }
      location.replace('index.html');
    })
    $('#editContact').on('reset', function(e){
      if( localStorage.getItem(storageEdit) ) {localStorage.removeItem(storageEdit); }
      location.replace('index.html');
    })
    break;
  case "contactDelete": // Delete Contact --------------------------------------
    var delID;
    if( localStorage.getItem(storageDel) ) {
      // pull localStorage delete id
      delID = localStorage.getItem(storageDel);
      fillOutContact(delID, 'delete');
    } else {
      var select = buildContactSelect('selectDelete');
      $('#delSelect').append(select);

      var delSelect = document.getElementById('selectDelete');
      delSelect.addEventListener('change', function(e){
        e.preventDefault();
        delID = delSelect.value
        fillOutContact(delID, 'delete');
      })
    }
    // display confirmation info

    // loop through contacts array and remove the one matching the id
    $('#deleteContact').submit(function(e){
      e.preventDefault();
      var newContacts = [];
      //var delID = localStorage.getItem(storageDel);
      console.log(delID);
      for( var i = 0; i < contacts.length; i++ ) {
        if( contacts[i].id != delID ) { newContacts.push(contacts[i]); }
      }
      contacts = newContacts;
      var update = JSON.stringify(contacts);
      localStorage.setItem(storage, update);
      if( localStorage.getItem(storageDel) ) {localStorage.removeItem(storageDel); }
      if( contacts.length == 0 ) { localStorage.removeItem(storage); }

      location.replace('index.html');
    })
    $('#deleteContact').on('reset', function(e){
      if( localStorage.getItem(storageDel) ) {localStorage.removeItem(storageDel); }
      location.replace('index.html');
    })
    break;
}

/* ---- Search -------------------------------------------------------------- */
$('#searchContacts').on('submit', function(e){
  e.preventDefault();
  if( $('#searchFor').val()  !== '' ) { search($('#searchFor').val()); }
})
$('#searchButton').on('click', function(e) {
  e.preventDefault();
  if( $('#searchFor').val()  !== '' ) { search($('#searchFor').val()); }
})

/* ---- Helper Functions ---------------------------------------------------- */
function search( searchTerm ) {
  for( var i = 0; i < contacts.length; i++ ) {
    var contact = contacts[i];
    var match = false;
    if( contact.fname == searchTerm )   { match = true; }
    if( contact.lname == searchTerm )   { match = true; }
    if( contact.phone == searchTerm )   { match = true; }
    if( contact.email == searchTerm )   { match = true; }
    if( contact.street == searchTerm )  { match = true; } // TODO: fuzzy search
    if( contact.city == searchTerm )    { match = true; }
    if( contact.state == searchTerm )   { match = true; }
    if( contact.zip == searchTerm )     { match = true; }

    if( match === true )  { document.getElementById('row' + contact.id).style.display = ''; }
    else                  { document.getElementById('row' + contact.id).style.display = "none"; }
  }
}

function validateFields(){
  $('#fname').on('blur', function(e) {
    e.preventDefault();
    if( $('#fname').val() == '' ) { validationFailed('fname'); }
  })
  $('#fname').on('change', function(e){ e.preventDefault(); resetField('fname'); })

  $('#lname').on('blur', function(e){
    e.preventDefault();
    if( $('#lname').val() == '') { validationFailed('lname'); }
  })
  $('#lname').on('change', function(e){ e.preventDefault(); resetField('lname'); })

  $('#phone').on('blur', function(e){
    e.preventDefault();
    var phone = $('#phone').val();
    if( phone != '' ){
      var format = /\d{3}-\d{3}-\d{4}/;
      var passFail = format.test(phone);
      if( passFail == false ) { validationFailed('phone'); }
    }
  })
  $('#phone').on('change', function(e){ e.preventDefault(); resetField('phone'); })
  $('#email').on('blur', function(e){
    e.preventDefault();
    var email = $('#email').val();
    if( email != '' ){
      var format = /\S{2,}@\S{2,}.[a-z]{2,}/;
      var passFail = format.test(email);
      if( passFail == false ) { validationFailed('email'); }
    }
  })
  $('#email').on('change', function(e){ e.preventDefault(); resetField('email'); })

  $('#state').on('blur', function(e){
    e.preventDefault();
    var state = $('#state').val();
    if( state.length > 2 ) { validationFailed('state'); }
  })
  $('#state').on('change', function(e){ e.preventDefault(); resetField('state'); })

  $('#zip').on('blur', function(e) {
    e.preventDefault();
    var zipPatt = /\d{5}/;
    var testResults = zipPatt.test($('#zip').val());
    if( testResults === false ) { validationFailed('zip'); }
  })
  $('#zip').on('change', function(e){ e.preventDefault(); resetField('zip'); })
}
function validationFailed(field) {
	// add a class to the group
  // TODO: validate state is 2 letters
	var groupID = field + groupName;
	var test = document.getElementById(groupID);
	var classes = test.getAttribute('class');
	classes += " " + classFail;
	test.setAttribute('class', classes);
	switch(field){
		case "fname":
			document.getElementById(field).setAttribute('placeholder', txtErrorFname);
			break;
		case "lname":
			document.getElementById(field).setAttribute('placeholder', txtErrorLname);
			break;
		case "phone":
		case "email":
    case "state":
    case "zip":
			var errorHelpExists = document.getElementsByClassName('errorHelp');
			if( errorHelpExists.length == 0) {
				var div = document.createElement('div');
				div.setAttribute('class', 'errorHelp');
			} else {
				var div = errorHelpExists[0];
			}
			if( field == "phone")					{ div.innerHTML = txtErrorPhone; }
			else if ( field == "email" )	{ div.innerHTML = txtErrorEmail; }
      else if ( field == "state" )	{ div.innerHTML = txtErrorState; }
      else if ( field == "zip" )	  { div.innerHTML = txtErrorZip; }

			document.getElementById(field + groupName).appendChild(div);
			break;
	}
	document.getElementById(field).focus();
}
function resetField(field){
	var groupId = field + groupName;
	var classes = document.getElementById(groupId).getAttribute('class');
	classes = classes.replace(classFail, '');
	document.getElementById(groupId).setAttribute('class', classes);

  switch(field)
  {
    case 'phone':
    case 'email':
    case 'state':
    case 'zip':
      var errorHelps = document.getElementsByClassName('errorHelp')
  		if( errorHelps.length == 1 ){
  			document.getElementsByClassName('errorHelp')[0].remove();
  		}
      break;
  }
}

function findId( target, state ) {
  var classList = target.classList;
  if( state == 'edit')  { var patt = /edid/i; }
  else if( state == 'delete')   { var patt = /delid/i; }
  for( var i = 0; i < classList.length; i++ ) {
    var test = classList[i].search(patt);
    if( test != -1 ) { var id = classList[i].replace(patt, ''); }
  }
  return id;
}

function buildContactSelect(id) {
  var select = document.createElement('select');
  select.setAttribute('id', id);
  var option = document.createElement('option');
  option.innerHTML = txtSelectContact;
  select.appendChild(option);
  for( var i = 0; i < contacts.length; i++ ){
    var option = document.createElement('option');
    option.setAttribute('value', contacts[i].id);
    option.innerHTML = contacts[i].fname + " " + contacts[i].lname;
    select.appendChild(option);
  }
  return select;
}

function fillOutContact(id, stage) {
  var contact;
  for( var i = 0; i < contacts.length; i++ ) {
    if( contacts[i].id == id ) { contact = contacts[i]; }
  }
  if( stage == 'edit') {
    $('#fname').val(contact.fname);
    $('#fname').focus();
    $('#lname').val(contact.lname);
    $('#phone').val(contact.phone);
    $('#email').val(contact.email);
    $('#street').val(contact.street);
    $('#city').val(contact.city);
    $('#state').val(contact.state);
    $('#zip').val(contact.zip);
  } else if( stage == "delete") {
    var address = contact.fname + " " + contact.lname + "<br />";
    if( contact.phone != '' ) { address += contact.phone + "<br />"; }
    if( contact.email != '' ) { address += contact.email + "<br />"; }
    if( contact.street != '' ) { address += contact.street + "<br />"; }
    if( contact.city != '' ) { address += contact.city + ", " + contact.state + " " + contact.zip + "<br />"; }
    document.getElementById('contactToDelete').innerHTML = address;
  }
}

function autoGenerateID() {
  return contacts.length;
}

/* ---- Prototypes ---------------------------------------------------------- */
function Contact(fname, lname, phone, email, street, city, state, zip) {
  this.id = autoGenerateID();
  this.fname = fname;
  this.lname = lname;
  this.phone = phone;
  this.email = email;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
}
