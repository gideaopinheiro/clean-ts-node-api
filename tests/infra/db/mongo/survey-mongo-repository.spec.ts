import { MongoHelper, SurveyMongoRepository } from '@/infra/db/mongodb'
import { Collection } from 'mongodb'
import { AddSurveyParams } from '@/domain/usecases/survey'

const makeFakeAddSurvey = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  },
  {
    answer: 'other_answer'
  }],
  date: new Date()
})

let surveyCollection: Collection

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut()
      await sut.add(makeFakeAddSurvey())
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should return all surveys on success', async () => {
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
      const sut = makeSut()
      const surveys = await sut.load()
      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toEqual('any_question')
      expect(surveys[1].question).toEqual('any_question2')
    })

    test('Should return empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.load()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load survey by id success', async () => {
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        },
        {
          answer: 'other_answer'
        }],
        date: new Date()
      })
      const id = res.ops[0]._id
      const sut = makeSut()
      const survey = await sut.loadById(id)
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })
  })
})