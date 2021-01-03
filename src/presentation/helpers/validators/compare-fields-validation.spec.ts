import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

describe('CompareFields Validation', () => {
  test('Should return an InvalidParamError if validation fails', () => {
    const sut = new CompareFieldsValidation('field', 'field_to_compare')
    const error = sut.validate({ field: 'any_field', field_to_compare: 'any_different_field' })
    expect(error).toEqual(new InvalidParamError('field_to_compare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = new CompareFieldsValidation('field', 'field_to_compare')
    const error = sut.validate({ field: 'any_field', field_to_compare: 'any_field' })
    expect(error).toBeFalsy()
  })
})
