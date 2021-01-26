import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResultModel } from '@/domain/usecases/survey-result'

export const mockSurveyResult = (): SurveyResultModel => ({
  surveyId: 'any_survey_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
    count: 0,
    percent: 0,
    isCurrentAccountAnswer: true
  }, {
    answer: 'other_answer',
    count: 0,
    percent: 0,
    isCurrentAccountAnswer: true
  }],
  date: new Date()
})

export const mockNullSurveyResult = (): SurveyResultModel => ({
  surveyId: 'any_survey_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
    count: 0,
    percent: 0,
    isCurrentAccountAnswer: false
  }, {
    answer: 'other_answer',
    count: 0,
    percent: 0,
    isCurrentAccountAnswer: false
  }],
  date: new Date()
})

export const mockSurveyResultData = (): SaveSurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})
