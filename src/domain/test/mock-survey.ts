import { SurveyModel } from '@/domain/models/survey'

export const mockSurvey = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      },
      {
        answer: 'any_answer2'
      }
    ],
    date: new Date()
  }
}

export const mockSurveyList = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        },
        {
          answer: 'any_answer2'
        }
      ],
      date: new Date()
    },
    {
      id: 'any_id2',
      question: 'any_question2',
      answers: [
        {
          image: 'any_image2',
          answer: 'any_answer2'
        },
        {
          answer: 'any_answer22'
        }
      ],
      date: new Date()
    }
  ]
}
