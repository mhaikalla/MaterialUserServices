export const HttpResponseStatus = {
  OK :{
    CODE : 200,
    STATUS : 'OK'
  },
  CREATED :{
    CODE : 201,
    STATUS : 'Data Created'
  },
  NOTFOUND :{
    CODE : 404,
    STATUS : 'NotFoundError',
    MESSAGE : 'Data Not Found'
  },
  INTERNAL_SERVER_ERROR :{
    CODE : 500,
    STATUS : 'InternalServerError'
  },
  BAD_REQUEST :{
    CODE : 400,
    STATUS : 'ValidationError'
  },
  UNAUTHORIZED :{
    CODE : 401,
    STATUS : 'Unauthorized'
  },
  FORBIDDEN :{
    CODE : 403,
    STATUS : 'Forbidden'
  },
}

export interface HttpResponse {
  status?: string
  code? : number,
  message? : string,
  errors? : any,
  result? : any,
  stack? : any
}

export class ResponseBuilder {
  static ok = <T>(result?: T, message?: string): HttpResponse => {
    const response: HttpResponse = {
      status: message || HttpResponseStatus.OK.STATUS,
      code  : HttpResponseStatus.OK.CODE,
      result: result
    }
    return response
  }

  static created = <T>(result?: T, message?: string): HttpResponse => {
    const response: HttpResponse = {
      status: message || HttpResponseStatus.CREATED.STATUS,
      code  : HttpResponseStatus.CREATED.CODE,
      result: result
    }
    return response
  }
  static badRequest = <T>(errors: T, message?: string): HttpResponse => {
    const response: HttpResponse = {
      status: HttpResponseStatus.BAD_REQUEST.STATUS,
      message: message || "Bad Request",
      code: HttpResponseStatus.BAD_REQUEST.CODE,
      errors: errors
    }
    return response
  }

  static notFound = <T>(message?: string): HttpResponse => {
    const response: HttpResponse = {
      status: HttpResponseStatus.NOTFOUND.STATUS,
      message: message || "Data Not Found",
      code: HttpResponseStatus.NOTFOUND.CODE,
    }
    return response
  }

  static internalServerError = <T>(message?: string, stack?: T): HttpResponse => {
    const response: HttpResponse = {
      status: HttpResponseStatus.INTERNAL_SERVER_ERROR.STATUS,
      message: message || "Internal server error",
      code: HttpResponseStatus.INTERNAL_SERVER_ERROR.CODE,
      stack : String(stack)
    }
    return response
  }
  static unauthorized = <T>(message?: string): HttpResponse => {
    let response: HttpResponse = {
      status: HttpResponseStatus.UNAUTHORIZED.STATUS,
      message: message || "Unauthorized",
      code: HttpResponseStatus.UNAUTHORIZED.CODE,
    }
    return response
  }
  static forbidden = <T>(message?: string): HttpResponse => {
    const response: HttpResponse = {
      status: HttpResponseStatus.UNAUTHORIZED.STATUS,
      message: message || "Forbidden Access",
      code: HttpResponseStatus.UNAUTHORIZED.CODE,
    }
    return response
  }


}

