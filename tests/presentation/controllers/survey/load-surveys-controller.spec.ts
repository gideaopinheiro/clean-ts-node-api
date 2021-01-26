import { Controller } from '@/presentation/protocols'
import { LoadSurveys } from '@/domain/usecases/survey'
import { SurveyModel } from '@/domain/models'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys-controller'
import MockDate from 'mockdate'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadSurveysRepository } from '@/data/protocols/db/survey'

const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        },
        {
          answer: 'any_answer2'
        }
      ],
      date: new Date()
    },
    {
      id: 'any_id2',
      question: 'any_question2',
      answers: [
        {
          image: 'any_image2',
          answer: 'any_answer2'
        },
        {
          answer: 'any_answer22'
        }
      ],
      date: new Date()
    }
  ]
}

const mockRequest = (): LoadSurveysController.Request => ({ accountId: 'any_account_id' })

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async loadAll (accountId: string): Promise<LoadSurveysRepository.Result> {
      return Promise.resolve(makeFakeSurveys())
    }
  }
  return new LoadSurveysStub()
}

type SutTypes = {
  sut: Controller
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysStub, 'loadAll')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadAllSpy).toHaveBeenCalledWith('any_account_id')
  })

  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'loadAll')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeSurveys()))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'loadAll').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
