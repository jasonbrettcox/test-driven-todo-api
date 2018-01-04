// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */let searchedTodo = req.query;
   console.log(searchedTodo);
   for( i=0; i<todos.length; i++);




});
/* This endpoint responds with all of the todos
   */
app.get('/api/todos', function index(req, res) {
    res.json({todos})
  });
  

 /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
app.post('/api/todos', function create(req, res) {
 let newTodo = req.body;
 if (todos.length > 0){
  newTodo._id = todos[todos.length - 1]._id + 1;
  
 } else {
   newTodo.id = 1;
 }
 todos.push(newTodo);

 res.json(newTodo);
});




/* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
app.get('/api/todos/:id', function show(req, res) {
  var todoId= parseInt(req.params.id);
  var foundTodo = todos.filter(function (todo) {
    return todo._id == todoId;
  })[0];
  res.json(foundTodo);  
});
   

  


/* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
app.put('/api/todos/:id', function update(req, res) {
  let theTodo = todos.find(function(todos){ 
    return todos._id === Number(req.params.id);
  });
   
theTodo.task= req.body.task;
theTodo.description = req.body.description;
res.json(theTodo);
 });


app.delete('/api/todos/:id', function destroy(req, res) {
let todoId = Number(req.params.id)
let deletedTodo = todos.splice(( todoId -1), 1);
res.json(deletedTodo)
 
  });
  

  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond;
   * 
   * with deleted todo.
   */


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
