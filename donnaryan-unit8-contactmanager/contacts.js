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
      rows = buildTableRows(contacts);
      document.getElementById('contactList').innerHTML = rows;

      document.getElementById('contactList').addEventListener('click', function(e){
        e.preventDefault();
        if( $(e.target).hasClass('editContact') ) {             // edit button
          var id = findId( e.target, 'edit');
          localStorage.setItem(storageEdit, id);
          location.assign('edit.html');
        } else if ( $(e.target).hasClass('delContact') ) {      // delete button
          var id = findId( e.target, 'delete');
          localStorage.setItem(storageDel, id);
          location.assign('delete.html');
        } else if( $(e.target).hasClass('email-link') ) {       // email link
          var id = findId( e.target, 'email');
          for( var i = 0; i < contacts.length; i++ ) {
            if( contacts[i].id == id ) {
              var mailto = 'mailto:' + contacts[i].email;
              var mailWindow = window.open(mailto);
            }
          }
        } else if( $(e.target).hasClass('map-link') ) {         // map link
          var id = findId( e.target, 'maps' );
          for( var i = 0; i < contacts.length; i++ ) {
            if( contacts[i].id == id ) {
              var address = contacts[i].street + "+" + contacts[i].city + "+" + contacts[i].state + "+" + contacts[i].zip;
              var maplink = 'https://maps.google.com?q='+address;
              var mapWin = window.open(maplink);
            }
          }
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
    document.getElementById('addContact').addEventListener('submit', function(e) {
    //$('#addContact').submit(function(e){
      e.preventDefault();
      var fname   = document.getElementById('fname').value;
      var lname   = document.getElementById('lname').value;
      var phone   = document.getElementById('phone').value;
      var email   = document.getElementById('email').value;
      var street  = document.getElementById('street').value;
      var city    = document.getElementById('city').value;
      var state   = document.getElementById('state').value;
      var zip     = document.getElementById('zip').value;
      console.log(fname + " - " + lname);
      if( fname != '' && lname != ''  ) {
        var newContact = new Contact( fname, lname, phone, email, street, city, state, zip);
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
    if( location.search ){
      editID = findId(location.search, 'get');
      fillOutContact(editID, 'edit');
      localStorage.setItem(storageEdit, editID);
    }
    else if( localStorage.getItem(storageEdit) ) {
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
  var results = [];
  for( var i = 0; i < contacts.length; i++ ) {
    var match = false;
    if( contacts[i].fname == searchTerm )   { match = true; }
    if( contacts[i].lname == searchTerm )   { match = true; }
    if( contacts[i].phone == searchTerm )   { match = true; }
    if( contacts[i].email == searchTerm )   { match = true; }
    if( contacts[i].street == searchTerm )  { match = true; } // TODO: fuzzy search
    if( contacts[i].city == searchTerm )    { match = true; }
    if( contacts[i].state == searchTerm )   { match = true; }
    if( contacts[i].zip == searchTerm )     { match = true; }

    if( match === true )  { results.push(contacts[i]); }
  }
  if( results.length > 0 ) {
    document.getElementById('searchModalLabel').innerHTML = "Search Results";
    var table = '<table class="table table-striped table-sm">';
    table += '<thead><tr><th></th><th>Contact Name</th><th>Phone</th><th>Email</th><th class="text-center">Actions</th></tr></thead><tbody>';
    table += buildResultsRows( results );
    table += '</tbody></table>';
    document.getElementById('searchModalBody').innerHTML = table;

    $('#searchModal').modal('toggle');
  }
}

function buildTableRows( peoples ) {
  var rows = '';
  for( var i = 0; i < peoples.length; i++ ){
    var people = peoples[i];
    tr  =  '<tr id="row'+people.id+'">';
    tr += '<td class="text-center"><button class="btn btn-default btn-sm editContact edid'+people.id+'"><i class="fa fa-user editContact edid'+people.id+'" aria-hidden="true"> </i></button>';
    tr += '</td><td>' + people.fname + ' ' + people.lname + '</td>';
    tr += '<td>' + people.phone + '</td>';
    tr += '<td>' + people.email;
    if( people.email != ''){ tr += '<button class="btn btn-default btn-sm pull-right email-link emid' + people.id + '"><i class="fa fa-envelope-o email-link emid' + people.id + '" aria-hidden="true"></i></button></td>'; }
    tr += '<td>';
    if( people.street != '') {
      tr += people.street + ' ' + people.city + ', ' + people.state + ' ' + people.zip;
      tr += '<button class="btn btn-default btn-sm pull-right map-link mapid' + people.id + '"><i class="fa fa-map-o map-link mapid' + people.id + '" aria-hidden="true"></i></button></td>';
    }
    tr += '</td><td class="text-center">';
    tr += '<button class="btn btn-default btn-sm delContact delid'+people.id+'"><i class="fa fa-times delContact delid'+people.id+'" aria-hidden="true"></i></button>';
    tr += '</td></tr>';
    rows += tr;
  }
  return rows;
}

function buildResultsRows( peoples ) {
  var rows = '';
  for( var i = 0; i < peoples.length; i++ ){
    var people = peoples[i];
    tr  =  '<tr id="row'+people.id+'"></td>';
    tr += '<td><a href="edit.html?id='+people.id+'">' + people.fname + ' ' + people.lname + '</a></td>';
    tr += '<td>' + people.phone + '</td>';
    tr += '<td>' + people.email + '</td>';
    if( people.street != '')  { tr += '<td>' + people.street + ' ' + people.city + ', ' + people.state + ' ' + people.zip + '</td>'; }
    else                      { tr += '<td></td>'; }
    tr += '<td class="text-center"></td></tr>';
    rows += tr;
  }
  return rows;
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
	//document.getElementById(field).focus();
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
  if( state == 'edit')          { var patt = /edid/i; }
  else if( state == 'delete')   { var patt = /delid/i; }
  else if( state == 'email')    { var patt = /emid/i; }
  else if( state == 'maps')     { var patt = /mapid/i; }
  else if( state == 'get')      { var patt = /\?id=/i; }

  if( Array.isArray(classList) ) {
    for( var i = 0; i < classList.length; i++ ) {
      var test = classList[i].search(patt);
      if( test != -1 ) { var id = classList[i].replace(patt, ''); }
    }
  } else {
    var id = target.replace(patt, '');
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
