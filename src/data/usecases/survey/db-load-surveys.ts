import { LoadSurveysRepository } from '@/data/protocols/db/survey'
import { LoadSurveys } from '@/domain/usecases/survey'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async loadAll (accountId: string): Promise<LoadSurveys.Result> {
    const surveys = await this.loadSurveysRepository.loadAll(accountId)
    return surveys
  }
}
