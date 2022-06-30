const mocha = require('mocha')
const expect = require('chai').expect
const request = require('supertest')
const app = require('../src/app')
const db = require('../src/db/db')

describe('userapi test', () => {
    //---  connect to databse
    before((done) => {
        db.connectDB()
            .then(() => done())
            .catch((err) => done(err))
    })
    after((done) => {
        db.disconnectDB()
            .then(() => done())
            .catch((err) => done(err))
    })

    //--- user register test
    describe('POST /user', () => {
        it('it should contain name,email,password', (done) => {
                request(app)
                    .post('/users')
                    .send({ name: 'Test', email: 'test@example.com', password: '123456' })
                    .then((response) => {
                        const body = response.body
                        if (response.status === 201) {
                            expect(body).to.contain.property('_id')
                            expect(body).to.contain.property('name')
                            expect(body).to.contain.property('email')
                        } else {
                            expect(body).to.contain.property('message')
                        }
                        done()
                    })
                    .catch((err) => done(err))
            })
            //--- test case fail
        it('Fail test required filed', () => {
            request(app)
                .post('/users')
                .send({ name: 'Test test' })
                .then((res) => {
                    const body = res.body
                    console.log(body)
                })
        })
    })

    //--get user by id
    describe('GET /user:id', () => {
        it('get user by id', (done) => {
            request(app)
                .get('/users/finduser/60ea6fdd52f78a4f38e503ee')
                .then((res) => {
                    const body = res.body
                    console.log(body)
                    done()
                })
                .catch((err) => done(err))
        })
    })

    
})