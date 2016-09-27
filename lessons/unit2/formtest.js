
  /*********************************************************
   *
   *   Test Form Script - Display form fields automatically
   *
   *********************************************************/

  // loop through each form and handle submit event
  var forms = document.getElementsByTagName('form');
  for (var i=0;i<forms.length;i++) {
    forms[i].addEventListener('submit', function(e){
      e.preventDefault();

      // display each form field id and value
      var results = '';
      var fields = forms[0].elements;
      for (var k=0;k<fields.length;k++) {
        if (fields[k].id) {
          results += fields[k].id + '=' + fields[k].value + '\n';
        }
      }
      // display results
      alert(results);
    });
  }
