import { SurveyAnswer } from '../../models/survey'

export type AddSurveyParams = {
  question: string
  answers: SurveyAnswer[]
  date: Date
}

export interface AddSurvey {
  add: (data: AddSurveyParams) => Promise<void>
}
