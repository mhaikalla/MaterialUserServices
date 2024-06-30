import { Request, Response, NextFunction } from 'express';
import { ControllerBase } from './ControllerBase';
import { IUserService } from '../services/UserService';

import { UserResponse } from '../models/response';
import { Users, UserFilter } from '../models';
import { QueryFilterParam } from '../models/QueryFilter';
import { createTokenMiddleware } from 'src/middlewares/AuthMiddleware';
export class UserController extends ControllerBase {
  private _UserService: IUserService;

  constructor(UserService: IUserService) {
    super();
    this._UserService = UserService;
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params;
    const id = Number(params.id)
    try {
      const result = await this._UserService.findUserById(id)
      if(!result)
      {
        return this.NotFound(res, "Data Tidak Ditemukan")
      }
      else{
        return this.ok(res, result);
      }
    } catch (error) {
      return next(error);
    }
  };
  findAll = async (req: Request<any, any, any, QueryFilterParam<UserFilter>>, res: Response, next: NextFunction) => {
    try {
      const params = req.query;
      const filter = new UserFilter(
        req.query,
        params.first_name,
        params.last_name,
        params.email,
        params.password,
        params.phone
      );
      const result = await this._UserService.findAllUser(filter)
      if(!result)
      {
        return this.NotFound(res, "Data Tidak Ditemukan")
      }
      else{
        return this.ok(res, result);
      }
    } catch (error) {
     
      return next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    const bodyJson = req.body;
    try {
      const result = await this._UserService.create(bodyJson)
      if(!result)
      {
        return this.NotFound(res, "Data Tidak Ditemukan")
      }
      else{
        return this.created(res, result, "Data telah diinput");
      }
    } catch (error) {
     
      return next(error);
    }
  };
  update = async (req: Request, res: Response, next: NextFunction) => {
    const bodyJson = req.body;
    const id = Number(req.params.id);
    try {
      const result = await this._UserService.update(bodyJson, id)
      if(!result)
      {
        return this.NotFound(res, "Data Tidak Ditemukan")
      }
      else{
        return this.ok(res, result, "Data telah diupdate");
      }
    } catch (error) {
     
      return next(error);
    }
  };
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    try {
      const [result,errors] = await this._UserService.delete(id)
      if(errors != null)
        {
          return this.setResponse(res, errors?.code, errors?.message, null,null)
        }
        else{
          return this.setResponse(res,200, "", null,null)
        }
    } catch (error) {
     
      return next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const requestBody = req.body;
    try {
      const [result, errors] = await this._UserService.login(requestBody)
      if(result == null && errors != null)
      {
        return this.setResponse(res, errors?.code, errors?.message, null,null)
      }
      else{
        let [newToken, errNewToken] = createTokenMiddleware(result as Users)
        if (newToken == null) {
          return this.setResponse(res, errNewToken?.code, errNewToken?.message, null, null)
        }
        let finalResult : UserResponse = {
          first_name : result?.first_name ?? "",
          last_name : result?.last_name ?? "",
          email : result?.email ?? "",
          phone : result?.phone ?? "",
         bearer_token : newToken 
        }

        return this.setResponse(res,201, "", finalResult, null)
      }
    } catch (error) {
     
      return next(error);
    }
  };
}
