import { Controller, HttpResponse } from '@/presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      ...(req.body || {}),
      ...(req.params || {}),
      accountId: req.accountId
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json(httpResponse.body.message)
    }
  }
}
