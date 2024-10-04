import axios from 'axios'

export const http = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_AUTH_URL
})

export const httpEvent = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_EVENT_URL
})

