const{ObjectID} = require('mongodb');
const{mongoose} = require('./../server/db/mongoose');
const{Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/users')

/*let id = '5a0c1d2b684c1d1a805c4fd311';

if(!ObjectID.isValid(id)){
    console.log('ID no válido');
}
Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos',todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo',todo);
});

Todo.findById(id)
    .then((todo) => {
        if(!todo){
            return console.log('Id no encontrada');
        }
    console.log('Todo by Id',todo);
}).catch((e) => console.log(e));*/

let id = '59e8b1c342963533f45f30d9';

User.findById(id)
.then((user) => {
    if(!user){
        return console.log('Usuario no encontrado');        
    }
    console.log(JSON.stringify(user, undefined,2));    
}).catch((e) => console.log(e));