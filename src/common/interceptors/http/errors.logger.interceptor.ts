import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Logger } from '@nestjs/common';

@Injectable()
export class ErrorsLoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((err) => {
                Logger.error(err.message,err.stack);
                return throwError(err);
            }),
        );
    }
}
