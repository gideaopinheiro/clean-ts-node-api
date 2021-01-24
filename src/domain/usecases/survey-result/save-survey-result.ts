import { SurveyResultModel } from '@/domain/models'

export type SaveSurveyResultModel = {
  accountId: string
  surveyId: string
  answer: string
  date: Date
}

export interface SaveSurveyResult {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
