// lib/UserContext.ts

import { createContext } from "react"

interface UserBase {
  issuer?: string | null
  publicAddress?: string | null
  email?: string | null
  isMfaEnabled?: boolean
  phoneNumber?: string | null
  walletType?: string | null
  loading?: boolean
}

export type User = (UserBase & { [key: string]: any }) | null

export type UserContextType = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

export const UserContext = createContext<UserContextType | null>(null)
