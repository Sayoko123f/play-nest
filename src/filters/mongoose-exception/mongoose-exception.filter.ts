import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Error, MongooseError } from 'mongoose';
import { Request, Response } from 'express';

@Catch(MongooseError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    if (exception instanceof Error.CastError) {
      response.status(404).json('404 Not Found');
      return;
    }
    console.error(exception);
    response.status(500).json('500 Internal Server Error');
  }
}
