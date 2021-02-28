import { LogErrorRepository } from '@/data/protocols/db/log'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/login/signup-controller'

export const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      return Promise.resolve(null)
    }
  }
  return new LogErrorRepositoryStub()
}

const mockController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (request: any): Promise<HttpResponse> {
      return Promise.resolve(ok(mockAccount()))
    }
  }
  return new ControllerStub()
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const mockAccount = (): SignUpController.Request => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password'
})

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = mockController()
  const logErrorRepositoryStub = mockLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogControllerDecorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleControllerSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(mockAccount())
    expect(handleControllerSpy).toHaveBeenCalledWith(mockAccount())
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockAccount())
    expect(httpResponse).toEqual(ok(mockAccount()))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(Promise.resolve(mockServerError()))
    await sut.handle(mockAccount())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
