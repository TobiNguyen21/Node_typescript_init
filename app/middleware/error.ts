import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/errorResponse';
import { IServer } from '../interfaces/serverInterface';
import { notify } from '../configs/notify';

export default class ErrorHandle {
    static init(server: IServer): void {
        server.app.use(this.showError);
    }

    static showError(err: ErrorResponse, request: Request, response: Response, next: NextFunction): void {
        let error: any = { ...err }

        if (err.name === "CastError") {
            let message: string = notify.ERROR_CASTERROR;
            error = new ErrorResponse(404, message);
        }

        response
            .status(error.statusCode || 500)
            .send({
                success: false,
                message: error.message || "SEVER ERROR"
            })

        console.log(error);
    }
}