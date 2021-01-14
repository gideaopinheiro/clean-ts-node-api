import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'

describe('Survey Routes', () => {
  let surveyCollection: Collection
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /surveys', () => {
    test('Should return 403 if no access token is provided', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com'
            },
            {
              answer: 'Answer 2'
            }
          ]
        }).expect(403)
    })

    test('Should return 204 with valid token', async () => {
      const res = await accountCollection.insertOne({
        name: 'Gideão',
        email: 'gideao345@gmail.com',
        password: '123',
        role: 'admin'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: id
      },
      {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com'
            },
            {
              answer: 'Answer 2'
            }
          ]
        }).expect(204)
    })
  })

  describe('GET /surveys', () => {
    test('Should return 403 on load surveys if no access token is provided', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    test('Should return 200 on load surveys with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'Gideão',
        email: 'gideao345@gmail.com',
        password: '123'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: id
      },
      {
        $set: {
          accessToken
        }
      })
      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [{
            image: 'any_image',
            answer: 'any_answer'
          },
          {
            answer: 'other_answer'
          }],
          date: new Date()
        },
        {
          question: 'any_question2',
          answers: [{
            image: 'any_image2',
            answer: 'any_answer2'
          },
          {
            answer: 'other_answer2'
          }],
          date: new Date()
        }
      ])
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .send({}).expect(200)
    })

    test('Should return 204 on load surveys when there are no surveys', async () => {
      const res = await accountCollection.insertOne({
        name: 'Gideão',
        email: 'gideao345@gmail.com',
        password: '123'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: id
      },
      {
        $set: {
          accessToken
        }
      })
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .send({}).expect(204)
    })
  })
})
