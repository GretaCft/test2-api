//const MongoClient = require('mongodb').MongoClient;

//Es equivalente a la anterior, permite extraer las prop
//MongoClient y ObjectID del objeto creado con require(mongodb)
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
       return console.log('Error de conexión con Mongo server');
    }
    console.log('Conectado a MongoDB sever');

    // db.collection('Todos').find({
    // _id: new ObjectID("59e5199753260e06043cd4db")
    // }).toArray().then((docs) => {
    // console.log('Todos');
    // console.log(JSON.stringify(docs, undefined, 2));
    // },(err)=>{
    // console.log('Imposible insertar', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    //     },(err)=>{
    //     console.log('Imposible insertar', err);
    //     });
    // db.collection('Users').find({name:"Greta"}).count().then((count) => {
    //     console.log(`Users count: ${count}`);
    //     },(err)=>{
    //     console.log('Imposible insertar', err);
    //     });

    db.collection('Users').find({name:"Greta"}).toArray().then((docs) => {
         console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
        },(err)=>{
            console.log('Imposible insertar', err);
            });

   // db.close();
});

//Generar ObjectID
//let obj = new ObjectID();
//console.log(obj);

//Extraer propiedades de un objeto según Ecma 6 
/*let user = {name: 'Greta', age: 41};
let {name} = user;
let {age} = user;*/

/*console.log(name);
console.log(age);*/

/*MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
       return console.log('Error de conexión con Mongo server');
    }
    console.log('Conectado a MongoDB sever');
    // db.collection('Todos').insertOne({
    //     text: 'Some test here',
    //     completed: false
    // },(err, result) => {
    //     if(err){
    //         return console.log('Imposible insertar', err);  
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     "name": "Greta",
    //     "age": 41,
    //     "location" : "Madrid"
    // }, (err,result) => {
    //     if(err){
    //         return console.log('Imposible insertar', err);
    //     }
    //     //console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());
    // });
    db.close();
});*/