import app from '@/main/config/app'
import request from 'supertest'

describe('BodyParser Middleware', () => {
  test('', async () => {
    app.post('/body_parser_test', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/body_parser_test')
      .send({ name: 'any_name' })
      .expect({ name: 'any_name' })
  })
})
