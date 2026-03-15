import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Database error';

    if (exception.code === 'P2002') {
      statusCode = HttpStatus.CONFLICT;
      message = 'Duplicate value violates unique constraint';
    }

    if (exception.code === 'P2025') {
      statusCode = HttpStatus.NOT_FOUND;
      message = 'Records not found';
    }

    response.status(statusCode).json({
      statusCode,
      success: false,
      message,
    });
  }
}
