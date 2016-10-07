/* ---- Global Variables ---------------------------------------------------- */
var contacts = [];
var tdColSpan = 5;
var storage = 'contacts';
var storageEdit = 'edit';
var storageDel = 'delete';
var groupName = "Group";
var classFail = 'has-error';

var txtNoContacts = "There are no contacts. You should go make some friends. Use the 'Add A Contact' link to add one of your new friends!";
var txtErrorFname = 'Please enter a first name for this contact';
var txtErrorLname = 'Please enter a last name for this contact';
var txtErrorPhone = 'The number provided was not the correct format. Please add it in as 333-333-4444';
var txtErrorEmail = 'The email address provided was not in the correct format. Please use the format email@address.com';

/* ---- The Fun Stuff! ------------------------------------------------------ */
if( localStorage.contacts ) { contacts = JSON.parse(localStorage.contacts); }
console.log( "Contacts length: " + contacts.length);
var bod = document.body.getAttribute('id');
console.log(bod);
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
          localStorage.setItem(storageEdit, id)
          location.assign('edit.html');
        } else if ( $(e.target).hasClass('delContact') ) {
          var id = findId( e.target, 'delete');
          localStorage.setItem(storageDel, id)
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

    // Everything's cool, add our contact
    $('#addContact').submit(function(e){
      e.preventDefault();
      var newContact = new Contact( $('#fname').val(), $('#lname').val(), $('#phone').val(), $('#email').val(), $('#street').val(), $('#city').val(), $('#state').val(), $('#zip').val() );
      contacts.push(newContact);
      var prep = JSON.stringify(contacts);
      localStorage.setItem(storage, prep);

      location.replace('index.html');
    })

    break;
  case "contactEdit": // Edit Contact ------------------------------------------
    // Step 1 - Fill in the form with the contact info
    // pull localStorage edit id
    var editID = localStorage.getItem(storageEdit);
    var editContact;
    // loop through the array to find the object we want, fill in the forms
    for( var i = 0; i < contacts.length; i++ ) {
      if( contacts[i].id == editID ) { editContact = contacts[i]; }
    }
    $('#fname').val(editContact.fname);
    $('#fname').focus();
    $('#lname').val(editContact.lname);
    $('#phone').val(editContact.phone);
    $('#email').val(editContact.email);
    $('#street').val(editContact.street);
    $('#city').val(editContact.city);
    $('#state').val(editContact.state);
    $('#zip').val(editContact.zip);
    // Step 2 - Update the object - we should still have the edit ID in localStorage
    $('#editContact').submit(function(e){
      e.preventDefault();
      console.log('Updating contact');
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
      localStorage.removeItem(storageEdit);

      location.replace('index.html');
    })
    break;
  case "contactDelete": // Delete Contact --------------------------------------
    // pull localStorage delete id
    // loop through contacts array and remove the one matching the id
    break;
}

/* ---- Helper Functions ---------------------------------------------------- */
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
			var errorHelpExists = document.getElementsByClassName('errorHelp');
			if( errorHelpExists.length == 0) {
				var div = document.createElement('div');
				div.setAttribute('class', 'errorHelp');
			} else {
				var div = errorHelpExists[0];
			}
			if( field == "phone")					{ div.innerHTML = txtErrorPhone; }
			else if ( field == "email" )	{ div.innerHTML = txtErrorEmail; }

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

	if( field == 'phone' || field == 'email') {
		var errorHelps = document.getElementsByClassName('errorHelp')
		if( errorHelps.length == 1 ){
			document.getElementsByClassName('errorHelp')[0].remove();
		}
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
