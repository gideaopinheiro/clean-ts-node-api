import { LoadSurveys } from '@/domain/usecases/survey'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurvey: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurvey.load()
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}