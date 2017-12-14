let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MONGODB_URI,{ server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } },{ useMongoClient: true });

mongoose.connect('mongodb://localhost/TodoApp', { useMongoClient: true })

module.exports = {
    mongoose
};