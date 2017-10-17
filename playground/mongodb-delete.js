const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
       return console.log('Error de conexión con Mongo server');
    }
    console.log('Conectado a MongoDB sever');

    //deleteMany
    // db.collection('Todos').deleteMany({text:"testing querys"})
    // .then((resulta) => {
    //     console.log(resulta.result);
    //     if(resulta.result.n === 0){
    //     console.log("No hay documentos para borrar");    
    //     }
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text:"testing querys"})
    // .then((resulta) => {
    //     console.log(resulta.result);
    //     if(resulta.result.n === 0){
    //     return console.log("No hay documentos para borrar");    
    //     }
    //     console.log(`Se ha borrado ${resulta.result.n} documento.`);
    // });

    //finOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed:false})
    // .then((resulta) => {
    //     if(resulta.value=== null){
    //     return console.log("No hay documentos para borrar");    
    //      }
    //     console.log(`Se ha borrado`);
    //     console.log(JSON.stringify(resulta.value, undefined, 2));
    // });

  
    // db.collection('Users').deleteMany({name:"Greta"})
    // .then((resulta) => {
    //     console.log(resulta.result);
    //     if(resulta.result.n === 0){
    //     return console.log("No hay documentos para borrar");    
    //     }
    //     console.log(`Se han borrado ${resulta.result.n} documentos.`);
    // });

    
    db.collection('Users').findOneAndDelete({_id: new ObjectID("59e60c12d8e4f12058f4de87")})
    .then((resulta) => {
        if(resulta.value=== null){
        return console.log("No hay documentos para borrar");    
         }
        console.log(`Se ha borrado`);
        console.log(JSON.stringify(resulta.value, undefined, 2));
    });

    db.close();
});
