import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.BAD_REQUEST;

    const exceptionResponse: any = exception.getResponse();
    const message = exceptionResponse.message || 'Error de validación';

    response.status(status).json({
      statusCode: status,
      message,
      error: 'Bad Request',
    });
  }
}
