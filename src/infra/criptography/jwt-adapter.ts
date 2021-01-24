import jwt from 'jsonwebtoken'
import { Decrypter, Encrypter } from '@/data/protocols/criptography'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secretKey: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secretKey)
    return Promise.resolve(accessToken)
  }

  async decrypt (token: string): Promise<string> {
    const value: any = jwt.verify(token, this.secretKey)
    return Promise.resolve(value)
  }
}
