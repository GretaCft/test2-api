let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/users');

let app =express();

app.use(bodyParser.json());

//POST
app.post('/todos', (req, res) => {
    let todo = new Todo({
        text:req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

//GET


app.listen(3000, () =>{
    console.log('Conectado al puerto 3000');
})