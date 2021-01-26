import { SurveyModel, SurveyResultModel } from '@/domain/models'
import { mockSurvey, mockSurveyResult } from '@/tests/domain/mocks'
import { LoadSurveyById } from '@/domain/usecases/survey'
import { LoadSurveyResult } from '@/domain/usecases/survey-result'

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    surveyResultModel = mockSurveyResult()
    surveyId: string
    accountId: string

    async load (surveyId: string, accountId: string): Promise<SurveyResultModel> {
      this.surveyId = surveyId
      this.accountId = accountId
      return this.surveyResultModel
    }
  }
  return new LoadSurveyResultStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurvey())
    }
  }
  return new LoadSurveyByIdStub()
}
