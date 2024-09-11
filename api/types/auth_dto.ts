export type signUpRequestDTO = {
  name: string
  email: string
  password: string
  acceptedTerms: boolean
}

export type signUpResponseDTO = {
    name: string,
    email: string,
    roleType: string,
    nickname: string,
    username: string,
    message: string
  }


export type forgotPasswordRequestDTO = {
  email: string
}

export type forgotPaaswordResponseDTO = { 
  message: string 
}

export type signInRequestDTO = {
  email: string
  password: string
}

export type signInResponseDTO = {
  access_token: string
  id_token: string
  refresh_token: string
}
