import { LoadSurveyById } from '../../../../domain/usecases/survey/load-surveys-by-id'
import { InvalidParamError } from '../../../errors'
import { forbidden } from '../../../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Controller } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'))
    }
    return null
  }
}
