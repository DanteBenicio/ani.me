import axios from "axios";

export const kitsuApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

export const localApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
})