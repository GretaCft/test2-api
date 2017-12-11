let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/TodoApp');

//mongoose.connect('mongodb://localhost/TodoApp', { useMongoClient: true })

module.exports = {
    mongoose
};