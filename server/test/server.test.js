const expect = require('expect');
const request = require('supertest');
const{ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos=[{
    _id:new ObjectID(),
    text:"Primer test todo"
},
{
    _id:new ObjectID(),
    text:"Segundo test todo"
}]

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