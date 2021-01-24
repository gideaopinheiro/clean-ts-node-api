import { Decrypter } from '@/data/protocols/criptography'
import { AccountModel } from '@/domain/models'
import { LoadAccountByToken } from '@/domain/usecases/account'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
