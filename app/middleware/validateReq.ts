import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ErrorResponse from './../utils/errorResponse';

export default class ValidateReq {
    static init(req: Request, res: Response, next: NextFunction): boolean {
        const errors: any = validationResult(req).array();
        if (errors.length !== 0) {
            next(new ErrorResponse(400, errors));
            return true;
        }
        return false;
    }
}
