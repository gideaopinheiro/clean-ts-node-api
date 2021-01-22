import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'gideao pinheiro',
    email: 'gideao@gmail.com',
    password: 'any_password',
    role: 'admin'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Survey Routes', () => {
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

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/:surveyId/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    test('Should return 200 on save survey result', async () => {
      const accessToken = await makeAccessToken()
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          answer: 'any_answer',
          image: 'any_image'
        }, {
          answer: 'any_answer2'
        }],
        date: new Date()
      })
      await request(app)
        .put(`/api/surveys/${res.ops[0]._id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer'
        })
        .expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on Load survey result without accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .expect(403)
    })

    test('Should return 200 on load survey result', async () => {
      const accessToken = await makeAccessToken()
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          answer: 'any_answer',
          image: 'any_image'
        }, {
          answer: 'any_answer2'
        }],
        date: new Date()
      })
      await request(app)
        .get(`/api/surveys/${res.ops[0]._id}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
