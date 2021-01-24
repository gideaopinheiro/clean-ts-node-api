import { DbLoadSurveyResult } from '@/data/usecases/survey-result/db-load-survey-result'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-reposiroty'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRespository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRespository, surveyMongoRepository)
}
