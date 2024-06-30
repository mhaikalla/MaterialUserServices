import { Request, Response, NextFunction } from 'express';
import {ResponseBuilder,HttpResponse } from '../utils/ApiJsonResponse';
import {Users} from '../models/index';
import { config as dotenv } from 'dotenv';
var jwt = require('jsonwebtoken');

export const verifyTokenAuthenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const headerString = req.headers.Authorization || req.headers.authorization;
  if (!headerString) {
    return ResponseBuilder.unauthorized("Empty Token Access");
  }

  const secretKey = process.env.JWT_SECRET_KEY || "";
  let token = '';
  if (typeof headerString == 'string') {
    token = headerString.split(' ')[1];
  }
  
  try {
    const credential: string | object = jwt.verify(token, secretKey);
    if (credential) {
      req.app.locals.credential = credential;
      return next();
    }
    return ResponseBuilder.unauthorized("Invalid Token Access");
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      const errorMessage = error || 'Unauthorized';
      return ResponseBuilder.unauthorized(errorMessage as string);
    }
    return next(error);
  }
};


export const createTokenMiddleware = (user : Users): ([string | null, HttpResponse | null]) => { 
    let NewToken = null
    let secretKey = process.env.JWT_SECRET_KEY || ''
    let algorithm = process.env.ALGORITM_JWT || ''
    let hour = process.env.JWT_EXPIRED_IN_HOUR_TIME || 0
    let minute = process.env.JWT_EXPIRED_IN_MINUTES_TIME || 0
    let second = process.env.JWT_EXPIRED_IN_SECONDS_TIME || 0
    let exp = ""
    if (hour != 0) {
        exp += " " + hour + "h"
    }
    if (minute != 0) {
        exp += " " +  hour + "m"
    }
    if (second != 0) {
        exp += " " +  hour + "s"
    }
    exp = exp.trim()
    if (exp.length == 0){
        return [NewToken, ResponseBuilder.internalServerError("JWT Expired Time not set in config")];
    }
    if (algorithm.length == 0){
        return [NewToken,ResponseBuilder.internalServerError("Algorithm not set in config")];
    }
    if (secretKey.length == 0) {
        return [NewToken,ResponseBuilder.internalServerError("JWT Secret Key not exists in config")];
    }
    NewToken = jwt.sign({
      first_name : user.first_name,
      last_name : user.last_name,
      token : user.token,
      email : user.email
    }, secretKey,{ algorithm, expiresIn: exp }, (err :any) => {
        if (err) {
            console.error('Error verifying token:', err);
            return [null, ResponseBuilder.internalServerError("Empty Token Access :"+ err)];
        } 
    });
    return [NewToken, null]
  };