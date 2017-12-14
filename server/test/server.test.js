const expect = require('expect');
const request = require('supertest');
const{ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/users');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

if(!module.parent) {
   app.listen();
}

beforeEach(populateUsers);
beforeEach(populateTodos);


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
describe('PATCH /todos/:id', () => {
    it('Debe actualizar un doc', (done) => {
        let Id0 = todos[0]._id.toHexString();
        let text = "Updated text";

        request(app)
        .patch(`/todos/${Id0}`)
        .send({
            completed: true,
            text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
    });
    it('Debe borrar completedAt si Complete es false', (done) => {
        let Id1 = todos[1]._id.toHexString();
        let text = "Updated text2";

        request(app)
        .patch(`/todos/${Id1}`)
        .send({
            completed: false,
            text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);
    });

});
// describe('test delete',() => {
//     it('should respond 200',(done) =>{
//         let hexId = todos[1]._id.toHexString();
      
//         request(app)
//         .del(`/todos/${hexId}`)
//         .expect(200)
//         .expect((res) => {
//             expect(res.body.todo).toNotExist();
//         }) 
//         .end(done);    
//     })
    
//   });

describe('DELETE /todos/:id', () => {
    it('most delete a doc', (done) => {
        let hexId = todos[1]._id.toHexString();

        request(app)
        .del(`/todos/${hexId}`)
        .expect(200)
        .end((err, res) => {
            if(err){
                return done(err);
            } 
            
        Todo.findById(hexId).then((todo) => {
            expect(todo).toNotExist();
            done();
        }).catch((e) => done(e));
    
        });
    });
});

describe('GET /users/me', () => {
    it('Debe devolver un usuario authenticado', (done) =>{
        request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done)
    });
    it('Debe devolver un 401 si no está authenticado', (done) =>{
        request(app)
        .get('/users/me')
        .expect(401)
        .expect((res) => {
            expect(res.body).toEqual({});
        })
        .end(done)
    });
});

describe('POST /users', ()=> {
    it('debe crear un usuario', (done) =>{
        let email = 'gretasrv@yahoo.es';
        let password = '456uno';

        request(app)
        .post('/users')
        .send({email, password})
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toExist();
            expect(res.body._id).toExist();
            expect(res.body.email).toBe(email);
        })
        .end((err) => {
            if(err){
                return done(err);
            }
            User.findOne({email}).then((user) => {
                expect(user).toExist();
                expect(user.password).toNotBe(password);
                done();
            })
        });
    });
    it('debe devolver error si el request no es válido', (done) =>{
       request(app)
       .post('/users')
       .send({
           email:'and',
           password:'213'
       })
       .expect(400)
       .end(done);
    });
    it('no debe crear otro usuario con igual email', (done) =>{
        request(app)
        .post('/users')
        .send({
            email:users[0].email,
            password:'213'
        })
        .expect(400)
        .end(done);
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