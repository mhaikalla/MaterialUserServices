import {
    Users,UserAdmins
  } from '../../models/index';
  
  import { DataTypes, Model, Optional, CreationOptional, NOW, ModelDefined } from 'sequelize';
  import { getDb, getDataTypesChaining as _ } from '../sequelize/index';
  
  const defaultSetting = {
    underscored: true,
  };
  const baseEntity = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    created_at: DataTypes.NOW,
    updated_at: _(DataTypes.DATE).isNullable().withDefault(null),
    deleted_at: _(DataTypes.DATE).isNullable().withDefault(null)
  }  
  
  export const UsersTable = getDb().define<Model<Users>>('users', {
    ...baseEntity,
    first_name: _(DataTypes.STRING),
    last_name: _(DataTypes.STRING).isNullable(),
    email : _(DataTypes.STRING),
    password : _(DataTypes.STRING),
    phone : _(DataTypes.STRING).isNullable(), 
    token :   _(DataTypes.STRING).isNullable()
  }, {...defaultSetting, freezeTableName: true})
  
  export const UserAdminsTable = getDb().define<Model<UserAdmins>>('user_admins', {
    name: _(DataTypes.STRING),
    email : _(DataTypes.STRING),
    password : _(DataTypes.STRING),
    ...baseEntity
  }, {...defaultSetting, freezeTableName: true})
