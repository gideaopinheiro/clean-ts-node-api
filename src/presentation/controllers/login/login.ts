import { Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return Promise.resolve(badRequest(new MissingParamError('email')))
      }
      if (!password) {
        return Promise.resolve(badRequest(new MissingParamError('password')))
      }

      const validEmail = this.emailValidator.isValid(email)
      if (!validEmail) {
        return Promise.resolve(badRequest(new InvalidParamError('email')))
      }
      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
