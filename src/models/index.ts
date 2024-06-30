import { QueryFilter,QueryFilterParam } from "./QueryFilter"

export interface Users extends BaseEntity {
  first_name : string,
  last_name : string | null,
  email:  string,
  password : string,
  phone : string | null,
  token : string | null
} 
export interface UserAdmins extends BaseEntity {
  name : string | null,
  email:  string | null,
  password : string | null,
}

export interface BaseEntity {
  id  :  number,
  created_at : Date,
  updated_at : Date,
  deleted_at : Date | null
}


export class UserFilter extends QueryFilter<Users> {
  first_name? :  string | null
  last_name? :  string | null
  email?:   string | null
  password? :  string | null
  phone? :  string | null
  constructor(
    filter: QueryFilterParam<Users>,
    first_name? : string,
    last_name? : string,
    email?:  string,
    password?: string,
    phone? : string
  ) {
    super(filter);
    this.first_name = first_name ? String(first_name) : null,
    this.last_name = last_name ? String(last_name) : null,
    this.email = email ? String(email) : null,
    this.password = password ? String(password) : null,
    this.phone = phone ? String(phone) : null
  }
}

