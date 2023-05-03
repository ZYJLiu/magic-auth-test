import { createContext, useState, useContext } from "react"

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

const UserContext = createContext<UserContextType>(defaultUserContext)

export const useUserContext = () => useContext(UserContext)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>({ loading: true })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
