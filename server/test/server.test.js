const expect = require('expect');
const request = require('supertest');
const{ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

if(!module.parent) {
   app.listen();
}

const todos=[{
    _id:new ObjectID(),
    text:"2 test todo"
},
{
    _id:new ObjectID(),
    text:"1 test todo"
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});


describe('POST/todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Text todo text2';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err,res) => {
            if(err){
                return done(err);
            }
            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });
    it('no debe crear el objeto', (done) =>{
         request(app)
         .post('/todos')
         .send({})
         .expect(400)
         .end((err,res) => {
            if(err){
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        })
    });
});
describe('GET/todos', () =>{
    it('Debe obtener todos los objetos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    }); 
});
describe('GET/todos/:id', () => {
    it('Debe devolver todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done);
    });

    it('Debe devolver 404 si el doc no seencuentra', (done) => {
        let hexId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('Debe devolver 404 si el objectId no es válido', (done) => {
         request(app)
         .get('/todos/12345')
         .expect(404)
         .end(done)
    });
});

// describe('test delete',function(){
//     it('should respond 200',function(done){
//         let hexId = todos[1]._id.toHexString();
//       request(app)
//       .del(`/todos/${hexId}`)
//       .expect(200)
//       .end(done);
//     })
//   });
// describe('DELETE /todos/:id', () => {
//     it('most delete a doc', (done) => {
//         let hexId = todos[1]._id.toHexString();

//         request(app)
//         .delete(`/todos/${hexId}`)
//         .expect(200)
//         .expect((res) => {
//             expect(res.body.todo._id).toBe(hexId);
//         })
//         .end((err, res) => {
//             if(err){
//                 return done(err);
//             } 
            
//         Todo.findById(hexId).then((todo) => {
//             expect(todo).toNotExist();
//             done();
//         }).catch((e) => done(e));
    
//         });
//     });
// });

// beforeEach((done) => {
//   Todo.remove({}).then(() => {
//     return Todo.insertMany(todos);
//   })
//   .then(() =>{
//     describe('DELETE /todos/:id', () => {
//       it('most delete a doc', (done) => {
//         let hexId = todos[1]._id.toHexString();

//         request(app)
//         .delete(`/todos/${hexId}`)
//         .expect(200)
//         .expect((res) => {
//                 // make sure you are you getting from req.body
//             expect(res.body.todo._id).toBe(hexId);
//         })
//         .end((err, res) => {
//             if(err) return done(err);

//         Todo.findById(hexId).then((todo) => {
//             expect(todo).toNotExist();
//             done();
//         }).catch((e) => done(e));

//         });
//       });
//     });
// });
// });