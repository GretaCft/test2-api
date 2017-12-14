let env = process.env.NODE_ENV || 'development';
console.log('env *****', env);

if(env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}else if(env === 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

const express = require('express');
const bodyParser = require('body-parser');
const _= require('lodash');
const bcrypt = require('bcryptjs');

let {ObjectID} = require('mongodb');
let {authenticate} = require('./middleware/authenticate');
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

//Delete
app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    
        if(!ObjectID.isValid(id)){
            return res.status(404).send();
        }
        Todo.findByIdAndRemove(id)
        .then((doc) => {
            if(!doc){
                return res.status(404).send();
            }
            res.send({doc});
            res.status(200).send({doc});
            console.log('Documento borrado', doc);
    }).catch((e) => {console.log(e);
            res.status(400).send();
    });
})
//Update
app.patch('/todos/:id', (req,res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;

    }
    Todo.findByIdAndUpdate(id, {$set:body}, {new:true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

//POST users

app.post('/users', (req, res) => {
    let body = _.pick(req.body,['email', 'password']);
    let user = new User(body);

    user.save().then(() => {
       return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

//GET user
app.get('/users/me', authenticate, (req, res) => {
   res.send(req.user);
});

//POST/users/login

app.post('/users/login', (req, res) => {

    let body = _.pick(req.body,['email', 'password']);

    User.findByCRedentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);    
    }).catch((e) => {
        res.status(400).send(e);
    });
});
});

app.listen(port, () =>{
    console.log(`Conectado al puerto ${port}`);
});
module.exports = {app};

 