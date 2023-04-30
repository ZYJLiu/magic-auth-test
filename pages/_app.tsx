import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { useState } from "react"
import { UserContext, User } from "../lib/UserContext"
import Header from "@/components/header"

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>({ loading: true })

  return (
    <ChakraProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  )
}
