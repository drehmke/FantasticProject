/* Can I add Date Due ? and Delete ? */
var sessKey = "todo";
var today = new Date();
var todayDisplay = document.getElementById('todaysdate');
var todoList = document.getElementById('todoList');
todayDisplay.innerHTML = today.toDateString();

// display existing todos ------------------------------------------------------
var allTodos = getTodos();
if( !allTodos ) { allTodos = []; }

if( allTodos.length > 0 ) {
  for( var i = 0; i < allTodos.length; i++ )
  { createRow(allTodos[i]); }
}

// adding a new todo -----------------------------------------------------------
var newForm = document.getElementById('todoNew');
newForm.addEventListener('submit', function(e){
  e.preventDefault();
  // create our new todo
  var newTodo = new toDo(document.getElementById('todo').value );
  // add it to the existing todos
  allTodos.push(newTodo);
  // stringify it
  var prep = JSON.stringify(allTodos);
  // save it
  localStorage.setItem(sessKey, prep);
  // update the table
  createRow(newTodo);
})

// Toggle task completeness - any checkbox, on change, bubble up ---------------
todoList.addEventListener('change', function(e){
  e.preventDefault();
  if( e.target.tagName == 'INPUT' ) {
    var cid = e.target.id;
    // find the todo and change the completeness
    for( var i = 0; i < allTodos.length; i++ ) {
      if( allTodos[i].id == cid ) {
        if( allTodos[i].complete == true ) {
          allTodos[i].complete = false;
          allTodos[i].cdDate = false;
        } else {
          allTodos[i].complete = true;
          allTodos[i].cdDate = formatShortDate( today );
          // update the cell for Completed
          var cdCell = document.getElementById('cdID'+cid);
          cdCell.innerHTML = formatShortDate(today);
        }
      }
      //console.log(allTodos[i]);
    }
    // and we'll need to re-store allTodos
    var update = JSON.stringify(allTodos);
    localStorage.setItem(sessKey, update);
  }
})

// Delete All Tasks ------------------------------------------------------------
var delAll = document.getElementById('clearList');
delAll.addEventListener('click', function(){
  // Kill command received!
  if( allTodos ) {
    localStorage.removeItem(sessKey);
    todoList.innerHTML = '';
  }
})
/* ---- Functions ----------------------------------------------------------- */
function createRow( todo )
{
  var tr;
  var tds;
  tr = document.createElement('tr');
  tr.setAttribute('rowid', todo.id);
  tds = createTd(todo.id, 'text'); // id
  tr.appendChild(tds);
  tds = createTd(todo.complete, 'checkbox', todo.id); // complete
  tr.appendChild(tds);
  tds = createTd(todo.name, 'text'); // name
  tr.appendChild(tds);
  tds = createTd(todo.crDate, 'text'); // created date
  tr.appendChild(tds);
  tds = createTd(todo.cdDate, 'text'); // completed date
  tds.setAttribute('id', 'cdID'+todo.id);
  tr.appendChild(tds);
  todoList.appendChild(tr);
}

function createTd(data, type, id = '')
{
  if( type == 'text' )
  {
    var td = document.createElement('td');
    if( data != false )
    {td.innerHTML = data;}
  } else if ( type == "checkbox" )
  {
    var check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.setAttribute('name', 'completeTodos');
    check.setAttribute('id', id);
    if( data === true )
    {
      check.setAttribute('checked', 'true');
    }
    var td = document.createElement('td');
    td.appendChild(check);
  }
  return td;
}
function formatShortDate( date )
{
  var formatted = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
  return formatted;
}

function getTodos()
{
  var todos = [];
  var stringTodos = localStorage.getItem(sessKey);
  if( stringTodos ){
    todos = JSON.parse(stringTodos);
  }
  return todos;
}

function autoGenerateID()
{
  var todoArr = getTodos();
  if( !todoArr ) { return 1; }
  else           { return todoArr.length + 1; }
}

/* ---- Prototypes ---------------------------------------------------------- */
function toDo(name,complete = false, cdDate = false){
  this.id = autoGenerateID();
  this.name = name;
  this.crDate = formatShortDate(today);
  this.complete = complete;
  this.cdDate = cdDate;
}
