import { AccountMongoRepository } from './account'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'

const makeFakeAccount = (): any => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

let accountCollection: Collection

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add(makeFakeAccount())
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne(makeFakeAccount())
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeNull()
  })

  test('Should update the account accessToken on UpdateAccessToken success', async () => {
    const sut = makeSut()
    const res = await accountCollection.insertOne(makeFakeAccount())
    expect(res.ops[0].accessToken).toBeFalsy()
    await sut.updateAccessToken(res.ops[0]._id, 'any_token')
    const account = await accountCollection.findOne({ _id: res.ops[0]._id })
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })
})
