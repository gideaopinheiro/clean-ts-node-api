import { DbAddSurvey } from '@/data/usecases/survey/db-add-survey'
import { AddSurvey } from '@/domain/usecases/survey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-reposiroty'

export const makeDbAddSurvey = (): AddSurvey => {
  const addSurveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(addSurveyMongoRepository)
}
