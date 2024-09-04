export type signUpRequestDTO = {
  name: string
  email: string
  password: string
  acceptedTerms: boolean
}


export type forgotPasswordRequestDTO = {
  email: string
}

export type forgotPaaswordResponseDTO = { 
  message: string 
}

export type confirmForgotPasswordRequestDTO = {
  newPassword: string
  email: string
}

export type confirmForgotPasswordResponseDTO = {
  message: string
}

