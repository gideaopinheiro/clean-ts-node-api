import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return Promise.resolve(badRequest(new MissingParamError('email')))
    }
    if (!httpRequest.body.password) {
      return Promise.resolve(badRequest(new MissingParamError('password')))
    }

    const { email } = httpRequest.body
    const validEmail = this.emailValidator.isValid(email)
    if (!validEmail) {
      return Promise.resolve(badRequest(new InvalidParamError('email')))
    }
  }
}
