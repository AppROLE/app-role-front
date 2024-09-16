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

export type forgotPasswordResponseDTO = {
  message: string
}

export type confirmForgotPasswordRequestDTO = {
  newPassword: string
  email: string
}

export type confirmForgotPasswordResponseDTO = {
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

export type signInRequestDTO = {
  email: string
  password: string
}

export type signInResponseDTO = {
  access_token: string
  id_token: string
  refresh_token: string
}

export type confirmCodeResponseDTO = {
  message: string
}
