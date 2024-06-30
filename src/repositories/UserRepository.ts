import {Op} from 'sequelize'
import {
  UserFilter,
  Users
} from '../models'; 
import {
  UserLoginRequest
} from '../models/request'; 
import { UsersTable  } from '../db/sequelize/table';
import {QueryFilter} from '../models/QueryFilter'
export interface IUserRepository {
  findById(id  :number): Promise<Users | null>
  findAll(filter : UserFilter): Promise<Users[]> 
  create(User : Users) : Promise<Users | null>
  delete(id : number) : Promise<boolean> 
  update(User:Users, id : number) : Promise<boolean>
  getLogin(request:UserLoginRequest) : Promise<Users | null>
}


export class UserRepository implements IUserRepository {
  getLogin = async (request:UserLoginRequest): Promise<Users | null> => {
    const result = await UsersTable.findOne({
      where: {
        email: request.email,
        password : request.password
      },
    })
    if(!result) return null
    return result.get({plain : true}) 
  }

  findById = async (id :number): Promise<Users | null> => {
    const result = await UsersTable.findByPk(id)
    if(!result) return null
    return result.get({plain : true})
  };
  findAll = async (filter : UserFilter): Promise<Users[]> => {
    const {keyword, page, limit} = filter
    const offset = limit * (page - 1) 
    let where = {}
    if(keyword){
      where = {
        [Op.or] :{
          title :{ [Op.like] : keyword},
          description :{ [Op.like] : keyword},
        }
      }
    }
    const result = await  UsersTable.findAll({
      where,
      limit,
      offset
    })
    if(result.length == 0) return []

    return result.map(m => m.get({plain : true}))
  };
  create = async(User : Users) : Promise<Users | null> => {
    try{
      const result = await UsersTable.create(User)
      return result.get({plain : true})
    }
    catch(ex)
    {
      
      return null
    }
  }
  update = async(User:Users, id : number) : Promise<boolean> => {
    try{
      await UsersTable.update(User, {where: {id}})
      return true 
    }
    catch(ex){
      return false
    }
  }
  delete = async(id : number) : Promise<boolean> => {
    try{
      await UsersTable.destroy({where: {id}})
      return true
    }
    catch(ex){
      return false
    }
  }
}
