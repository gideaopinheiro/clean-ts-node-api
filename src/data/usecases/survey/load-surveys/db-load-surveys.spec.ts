import { mockLoadSurveysRepository } from '@/data/test'
import { mockSurveyList } from '@/domain/test'
import MockDate from 'mockdate'
import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepository } from './db-load-surveys-protocols'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should calls LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return a list of surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(mockSurveyList())
  })

  test('Should throws if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'load').mockReturnValueOnce(Promise.reject(new Error()))
    const surveys = sut.load()
    await expect(surveys).rejects.toThrow()
  })
})
