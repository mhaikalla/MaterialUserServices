import { ResponseBuilder,HttpResponseStatus } from "../utils/ApiJsonResponse";
import { Response } from "express";



export class ControllerBase {
    setResponse<T>(res: Response, code? : number, message? : string, data?: T, error? : any) {
        switch (code) {
            case 200 :
                return this.ok(res,data, message)
                break;
            case 201 :
                return this.created(res,data, message)
                break;
            case 400 :
                return this.badRequest(res,message,error)
                break;
            case 401 :
                return this.Unauthorized(res,message)
                break;
            case 403 :
                return this.Forbidden(res,message)
                break;
            case 500 :
                return this.internalServerError(res,message,error)
                break;
            default:
                return this.ok(res,null,"")
                break;
        }
    }
    ok<T>(res: Response, data?: T, messageStatus? : string) {
        const response = ResponseBuilder.ok<T>(data)
        return res.status(HttpResponseStatus.OK.CODE).send(response)
    }

    created<T>(res: Response, data?: T, message? : string) {
        const response = ResponseBuilder.created<T>(data, message)
        return res.status(HttpResponseStatus.CREATED.CODE).send(response)
    }
    
    internalServerError<T>(res: Response, message?: string, errors?: T) {
        const response = ResponseBuilder.internalServerError<T>(message, errors)
        return res.status(HttpResponseStatus.INTERNAL_SERVER_ERROR.CODE).send(response)
    }

    badRequest<T>(res: Response, message?: string, errors?: T) {
        const response = ResponseBuilder.badRequest(errors, message)
        return res.status(HttpResponseStatus.BAD_REQUEST.CODE).send(response)
    }

    NotFound<T>(res: Response, message?: string) {
        const response = ResponseBuilder.notFound(message)
        return res.status(HttpResponseStatus.NOTFOUND.CODE).send(response)
    }

    Unauthorized<T>(res: Response, message?: string) {
        const response = ResponseBuilder.unauthorized(message)
        return res.status(HttpResponseStatus.UNAUTHORIZED.CODE).send(response)
    }
    Forbidden<T>(res: Response, message?: string) {
        const response = ResponseBuilder.forbidden(message)
        return res.status(HttpResponseStatus.FORBIDDEN.CODE).send(response)
    }
}