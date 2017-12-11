const{ObjectID} = require('mongodb');
const{mongoose} = require('./../server/db/mongoose');
const{Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/users')

/*Todo.remove({}).then((result) => {
    console.log(result);
});*/
//Todo.findOneAndRemove
/*Todo.findByIdAndRemove('5a19b934d0dfd822e47afa78').then((todo) => {
    console.log(todo);
})*/