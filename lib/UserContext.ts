import { createContext } from "react"

export type User = Record<string, any>

export type UserState = {
  user: User | null
  loading: boolean
}

export type UserContextType = {
  userState: UserState
  setUserState: React.Dispatch<React.SetStateAction<UserState>>
}

export const UserContext = createContext<UserContextType | null>(null)
