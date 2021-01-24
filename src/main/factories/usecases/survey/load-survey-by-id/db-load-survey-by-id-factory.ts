import { DbLoadSurveyById } from '@/data/usecases/survey/db-load-survey-by-id'
import { LoadSurveyById } from '@/domain/usecases/survey/load-surveys-by-id'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-reposiroty'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveyMongoRepository)
}
