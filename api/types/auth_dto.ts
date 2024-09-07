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

  export type resendCodeRequestDTO = {
    email: string
  }

  export type resendCodeResponseDTO = {
    message: string
  }


export type forgotPasswordRequestDTO = {
  email: string
}

export type forgotPaaswordResponseDTO = { 
  message: string 
}


