const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(__dirname));

app.use(bodyParser.json()); // support json encoded bodies

// some data for the API
var products = [
  { "id": 1, "name": "Donuts" },
  { "id": 2, "name": "Pizza" },
  { "id": 3, "name": "Tacos" },
  { "id": 4, "name": "Burritos" },
  { "id": 5, "name": "Ketchup" },
  { "id": 6, "name": "Sandwich" },
  { "id": 7, "name": "Pie" },
  { "id": 8, "name": "Mustard" },
  { "id": 9, "name": "Mayo" },
  { "id": 10, "name": "Chicken" },
  { "id": 11, "name": "Steak" },
  { "id": 12, "name": "Pasta" },
  { "id": 13, "name": "Cake" },
  { "id": 14, "name": "Coffee" },
  { "id": 15, "name": "Tea" },
  { "id": 16, "name": "Cupcake" },
  { "id": 17, "name": "Salad" },
  { "id": 18, "name": "Beans" },
  { "id": 19, "name": "Soup" },
  { "id": 20, "name": "Stew" },

];

var users = [
    {
        "id": 1,
        "name": "Adam Carter",
        "work": "Unilogic",
        "email": "adam.carter@unilogic.com",
        "dob": "1978",
        "address": "83 Warner Street",
        "city": "Boston",
        "optedin": true
      },
      {
        "id": 2,
        "name": "Leanne Brier",
        "work": "Connic",
        "email": "leanne.brier@connic.org",
        "dob": "13/05/1987",
        "address": "9 Coleman Avenue",
        "city": "Toronto",
        "optedin": false
      },{
        "id": 3,
        "name": "Rodrigo Lee",
        "work": "Funemployed",
        "email": "rodrigoleee@yahoo.com",
        "dob": "1995",
        "address": "908 Roxbury Street",
        "city": "Fullerton",
        "optedin": true
      },
      {
        "id": 4,
        "name": "James Harden",
        "work": "Rockets",
        "email": "james.harden@rockets.org",
        "dob": "13/05/1987",
        "address": "123 Harden Avenue",
        "city": "Houston",
        "optedin": false
      },
];


// the "index" route, which serves the app
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'/dist/index.html'))
});

// the GET "products" API endpoint
app.get('/api/products', function (req, res) {
    res.send(products);
});

// the GET "users" API endpoint
app.get('/api/users', function (req, res) {
    res.send(users);
});

// POST endpoint for creating a new product
app.post('/api/products', function (req, res) {
    

    console.log("POST products: " + req.body.name);

    // calculate the next ID
    let id = 1;
    if (products.length > 0) {
        let maximum = Math.max.apply(Math, products.map(function (p) { return p.id; }));
        id = maximum + 1;
    }

    // build the new product object
    let new_product = {"id": id, "name": req.body.name};

    // save the data by adding it to the "products" array in memory
    products.push(new_product);

    // In the real world, you would put code here to save the data to a
    // database or another type of storage.

    // When we're done, it's nice to return the newly created object to the caller.
    res.send(new_product);

});

// PUT endpoint for editing products
app.put('/api/products/:id', function (req, res) {

    console.log("PUT product: " + req.params.id);

    // read the ID from the query string
    let id = req.params.id;

    // find the requested products in the array
    let p = products.find(x => x.id == id);

    // write the new name to the data storage
    p.name = req.body.name;

    // send a copy of the modified object back to the caller
    res.send(p);

});

// DELETE endpoint for deleting products
app.delete('/api/products/:id', function (req, res) {

    console.log("DELETE product: " + req.params.id);

    // read the ID from the query string
    // (DELETE requests don't have a body)
    let id = req.params.id;

    // read the object from the data (so we have it later)
    let p = products.find(x => x.id == id);

    // remove it from the data
    products = products.filter(x => x.id != id);

    // send back the object we deleted, in case the caller wants to look at what was there
    res.send(p);
});

// POST endpoint for creating a new products
app.post('/api/users', function (req, res) {
    // NOTE: This is a sample app to show the Angular Http client functionality.
    // This API endpoint keeps the submitted data in memory. It does not save to a database.

    // This example uses Express because it is easy to install and run.
    // You could write a different back-end app in PHP, Python, Ruby, .NET, etc.

    console.log("POST users: " + req.body.name);

    // calculate the next ID
    let id = 1;
    if (users.length > 0) {
        let maximum = Math.max.apply(Math, users.map(function (u) { return u.id; }));
        id = maximum + 1;
    }

    // build the new user object
    let new_user = {"id": id, "name": req.body.name, "work": req.body.work,
    "email": req.body.email,
    "dob": req.body.dob,
    "address": req.body.address,
    "city": req.body.city,
    "optedin": req.body.optedin};

    // "save" the data by adding it to the "productss" array in memory
    users.push(new_user);

    // In the real world, you would put code here to save the data to a
    // database or another type of storage.

    // When we're done, it's nice to return the newly created object to the caller.
    res.send(new_user);

});

// PUT endpoint for editing users
app.put('/api/users/:id', function (req, res) {

    console.log("PUT users: " + req.params.id);

    // read the ID from the query string
    let id = req.params.id;

    // find the requested products in the array
    let u = users.find(x => x.id == id);

    // write the new name to the data storage
    u.name = req.body.name;
    u.work = req.body.work;
    u.email = req.body.email;
    u.dob = req.body.dob;
    u.address= req.body.address;
    u.city= req.body.city;
    u.optedin =  req.body.optedin;

    // send a copy of the modified object back to the caller
    res.send(u);

});

// DELETE endpoint for deleting users
app.delete('/api/users/:id', function (req, res) {
    
        console.log("DELETE users: " + req.params.name);
    
        // read the ID from the query string
        // (DELETE requests don't have a body)
        let id = req.params.id;
    
        // read the object from the data (so we have it later)
        let u = users.find(x => x.id == id);
    
        // remove it from the data
        users = users.filter(x => x.id != id);
    
        // send back the object we deleted, in case the caller wants to look at what was there
        res.send(u);
    });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Error');
    err.status = 405;
    next(err);
});

// HTTP listener
app.listen(3000, function () {
    console.log('Example listening on port 3000!');
});
module.exports = app;
