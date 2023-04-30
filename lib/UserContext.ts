// lib/UserContext.ts

import { createContext, useState, ReactNode } from "react"

interface UserBase {
  issuer?: string | null
  publicAddress?: string | null
  email?: string | null
  isMfaEnabled?: boolean
  phoneNumber?: string | null
  walletType?: string | null
  loading?: boolean
}

export type User = UserBase & { [key: string]: any }

export type UserContextType = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

// Create a default value for the UserContext
const defaultUserContext: UserContextType = {
  user: null, // Default user state
  setUser: () => {}, // Default setUser function (no-op)
}

export const UserContext = createContext<UserContextType>(defaultUserContext)
