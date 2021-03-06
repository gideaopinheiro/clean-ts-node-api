import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols/db/account'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account'
import { HashComparer, Encrypter } from '@/data/protocols/criptography'
import { AuthenticationModel } from '@/domain/models/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isAuth = await this.hashComparer.compare(authentication.password, account.password)
      if (isAuth) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return { accessToken, name: account.name }
      }
    }
    return null
  }
}
