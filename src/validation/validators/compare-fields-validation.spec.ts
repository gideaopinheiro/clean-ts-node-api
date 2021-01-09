import { InvalidParamError } from '../../presentation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'field_to_compare')
}

describe('CompareFields Validation', () => {
  test('Should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field', field_to_compare: 'any_different_field' })
    expect(error).toEqual(new InvalidParamError('field_to_compare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field', field_to_compare: 'any_field' })
    expect(error).toBeFalsy()
  })
})
