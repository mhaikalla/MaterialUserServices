import {Op} from 'sequelize'
import {
  UserFilter,
  UserAdmins
} from '../models'; 

import { UserAdminsTable  } from '../db/sequelize/table';
import {QueryFilter} from '../models/QueryFilter'
export interface IUserAdminRepository {
  findById(id  :number): Promise<UserAdmins | null>
  findAll(filter : UserFilter): Promise<UserAdmins[]> 
  create(User : UserAdmins) : Promise<UserAdmins | null>
  delete(id : number) : Promise<boolean> 
  update(User:UserAdmins, id : number) : Promise<boolean>
}


export class UserAdminRepository implements IUserAdminRepository {

  findById = async (id :number): Promise<UserAdmins | null> => {
    const result = await UserAdminsTable.findByPk(id)
    if(!result) return null
    return result.get({plain : true})
  };
  findAll = async (filter : UserFilter): Promise<UserAdmins[]> => {
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
    const result = await  UserAdminsTable.findAll({
      where,
      limit,
      offset
    })
    if(result.length == 0) return []

    return result.map(m => m.get({plain : true}))
  };
  create = async(User : UserAdmins) : Promise<UserAdmins | null> => {
    try{
      const result = await UserAdminsTable.create(User)
      return result.get({plain : true})
    }
    catch(ex)
    {
      
      return null
    }
  }
  update = async(User:UserAdmins, id : number) : Promise<boolean> => {
    try{
      await UserAdminsTable.update(User, {where: {id}})
      return true 
    }
    catch(ex){
      return false
    }
  }
  delete = async(id : number) : Promise<boolean> => {
    try{
      await UserAdminsTable.destroy({where: {id}})
      return true
    }
    catch(ex){
      return false
    }
  }
}
