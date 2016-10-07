/* ---- Global Variables ---------------------------------------------------- */
var contacts = [];
var tdColSpan = 5;
var storage = 'contacts';
var groupName = "Group";
var classFail = 'has-error';

var btnContact = '<i class="fa fa-user" aria-hidden="true"></i>';
var btnEdit = '<i class="fa fa-pencil" aria-hidden="true"></i>';
var btnDel = '<i class="fa fa-times" aria-hidden="true"></i>';

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
          localStorage.setItem('edit', id)
          location.assign('edit.html');
        } else if ( $(e.target).hasClass('delContact') ) {
          var id = findId( e.target, 'delete');
          localStorage.setItem('delete', id)
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
      createNewContact( $('#fname').val(), $('#lname').val(), $('#phone').val(), $('#email').val(), JSON.stringify($('#address').val()) );
      location.replace('index.html');
    })

    break;
  case "contactEdit": // Edit Contact ------------------------------------------
    break;
  case "contactDelete": // Delete Contact --------------------------------------
    break;
}

/* ---- Helper Functions ---------------------------------------------------- */
function createNewContact( fname, lname, phone, email, address ) {
  // Before we get too far, I want to take the "'s from around the stringified address
  var test = address.slice(1, (address.length - 1 ));
  console.log(test);
  // create our object
  var newContact = new Contact( fname, lname, phone, email, address );
  // add it to our existing array and then to localStorage
  contacts.push(newContact);
  var prep = JSON.stringify(contacts);
  localStorage.setItem(storage, prep);
}

function validationFailed(field) {
	// add a class to the group
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
function Contact(fname, lname, phone, email, address) {
  this.id = autoGenerateID();
  this.fname = fname;
  this.lname = lname;
  this.phone = phone;
  this.email = email;
  this.address = address;
}
