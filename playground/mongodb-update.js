const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
       return console.log('Error de conexión con Mongo server');
    }
    console.log('Conectado a MongoDB sever');

    // db.collection('Todos').findOneAndUpdate({
    //         _id: new ObjectID('59e4c5ea528bb4232834790c')
    //     },{
    //         $set:{
    //             completed: false
    //         }
    //     },{
    //         returnOriginal:true
    //     }
    // ).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        name: "Greta"
    },{
        $set:{
            name: "Humbe"
        },
        $inc:{
            age:2 
        }
}).then((result) => {
    console.log(result);
});
    
    db.close();
});
