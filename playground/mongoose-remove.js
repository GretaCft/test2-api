const{ObjectID} = require('mongodb');
const{mongoose} = require('./../server/db/mongoose');
const{Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/users')

/*Todo.remove({}).then((result) => {
    console.log(result);
});*/
//Todo.findOneAndRemove
Todo.findByIdAndRemove('5a0c9eb8abfd5a07143dc3e9').then((todo) => {
    console.log(todo);
})