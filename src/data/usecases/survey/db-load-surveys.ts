import { LoadSurveys } from '@/domain/usecases/survey'
import { SurveyModel } from '@/domain/models'
import { LoadSurveysRepository } from '@/data/protocols/db/survey'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.load()
    return surveys
  }
}
