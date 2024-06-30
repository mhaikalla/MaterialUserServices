export interface UserResponse {
    first_name : string | null,
    last_name : string | null,
    email:  string | null,
    phone : string | null,
    bearer_token : string | null
  } 

  export interface ErrorResponse {
    code : number
    description : string
  }