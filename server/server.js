let express = require('express');
let bodyParser = require('body-parser');

let {ObjectID} = require('mongodb');
let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/users');

let app =express();
const port = process.env.PORT || 3000;
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
app.get('/todos', (red, res)=>{
Todo.find().then((todos) => {
    res.send({todos});
    }, (e) =>{
    res.status(400).send(e);
    });
});

//GET/todos/123243
app.get('/todos/:id',(req,res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        console.log('ID no válido');
        return res.status(404).send();
    }
    Todo.findById(id)
    .then((todo) => {
        if(!todo){
            console.log('Id no encontrada');
            return res.status(404).send();
        }
        res.send({todo});
        console.log('Todo by Id',todo);
}).catch((e) => {console.log(e);
        res.status(400).send();
});
});

app.listen(port, () =>{
    console.log(`Conectado al puerto ${port}`);
})
module.exports = {app};