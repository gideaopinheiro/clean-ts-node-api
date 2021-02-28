import { AddSurvey } from '@/domain/usecases/survey/add-survey'

export interface AddSurveyRepository {
  add: (surveyData: AddSurvey.Params) => Promise<void>
}
