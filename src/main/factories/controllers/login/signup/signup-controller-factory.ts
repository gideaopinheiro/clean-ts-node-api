import { SignUpController } from '@/presentation/controllers/login/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAuthentication } from '@/main/factories/usecases/survey/add-survey/authentication/db-authentication-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '@/main/factories/usecases/decorator/log-controller-decorator-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signUpController)
}
