import { createContext } from "react"

export interface User {
  loading?: boolean
  issuer?: string
}

export const UserContext = createContext<User | null>(null)
