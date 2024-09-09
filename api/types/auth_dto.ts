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

export type confirmCodeRequestDTO = {
  email: string
  code: string
}

export type finishSignUpRequestDTO = {
  email: string,
  username: string,
  nickname?: string,
  password: string
}

export type finishSignUpResponseDTO = {
  message: string,
}


export type confirmCodeResponseDTO = {
  message: string
}

