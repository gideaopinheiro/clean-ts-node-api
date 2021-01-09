import { SurveyMongoRepository } from './survey-mongo-reposiroty'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'

const makeFakeAddSurvey = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  },
  {
    answer: 'other_answer'
  }]
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

  test('Should add a survey on success', async () => {
    const sut = makeSut()
    await sut.add(makeFakeAddSurvey())
    const survey = await surveyCollection.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
  })
})
