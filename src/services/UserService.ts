import { UserFilter, Users } from '../models/index';
import { UserLoginRequest } from '../models/request';
import { v4 as uuidv4 } from 'uuid';
import { IUserRepository } from '../repositories/UserRepository'
import {QueryFilter} from '../models/QueryFilter'
import { HttpResponse } from '../utils/ApiJsonResponse';
import { ControllerBase } from '../controllers/ControllerBase';

export interface IUserService {
  findAllUser(filter : UserFilter): Promise<[Users[], HttpResponse | null]>
  findUserById(id :number): Promise<[Users | null, HttpResponse | null]>
  create(User :Users): Promise<[Users | null, HttpResponse | null]>
  update(User: Users, id:number): Promise<[boolean, HttpResponse | null]>
  delete(id : number): Promise<[boolean, HttpResponse | null]>
  login(bodyRequest: UserLoginRequest ): Promise<[Users | null, HttpResponse | null]>
}

export class UserService implements IUserService {
  private _UserRepository: IUserRepository;
  
  constructor(
    UserRepository: IUserRepository,
  ) {
    this._UserRepository = UserRepository
  }

  
  login = async (bodyRequest : UserLoginRequest ): Promise<[Users | null, HttpResponse | null]> => {
    const result = await this._UserRepository.getLogin(bodyRequest)
    if (result != null) {
      let err : HttpResponse = {
        message : "Username or password invalid",
        code  :404,
      }
      return [null, err] 
    }
    return [result, null]
  }


  findAllUser = async (filter : UserFilter): Promise<[Users[], HttpResponse | null]> => {
    const result = this._UserRepository.findAll(filter)
    if (result != null) {
      let err : HttpResponse = {
        message : "user not found",
        code  :404,
      }
      return [[], err] 
    }
    return [result, null]
  }

  findUserById = async (id :number):  Promise<[Users | null, HttpResponse | null]> => {
    const result = this._UserRepository.findById(id)
    if (result != null) {
      let err : HttpResponse = {
        message : "user not found",
        code  :404,
      }
      return [null, err] 
    }
    return [result, null]
  }
  create = async (User :Users): Promise<[Users | null, HttpResponse | null]> => {
    const result = this._UserRepository.create(User)
    if (result != null) {
      let err : HttpResponse = {
        message : "Create User Failed",
        code  :500,
      }
      return [null, err] 
    }
    return [result, null]
  }

  update = async (User: Users, id : number): Promise<[boolean, HttpResponse | null]> => {
    let resp : HttpResponse 
    let currentData = await this._UserRepository.findById(id)
    if(!currentData)
    {
      resp = {
        message : "User Not Found",
        code  :404,
      }
      return [false, resp] 
    }
    else{
      currentData = {...User}
      const result = await this._UserRepository.update(currentData,id)
      if (!result) {
        resp = {
          message : "update User failed",
          code  :500,
        }
        return [false, resp] 
      }
      return [result, null]
    }
  }
  delete = async (id : number):Promise<[boolean, HttpResponse | null]> => {
    let err : HttpResponse 
    let currentData = await this._UserRepository.findById(id)
    if(!currentData)
    {
      err = {
        message : "User not Found",
        code  :404,
      }
      return [false, err] 
    }
    else{
      const result = await this._UserRepository.delete(id)
      return [true, null] 
    }
  }
}
