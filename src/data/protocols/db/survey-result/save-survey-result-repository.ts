import { SaveSurveyResultModel } from '@/domain/usecases/survey-result'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultModel) => Promise<void>
}
