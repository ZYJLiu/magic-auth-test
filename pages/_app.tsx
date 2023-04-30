import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { UserContext, User } from "../lib/UserContext"
import Router from "next/router"
import { magic } from "../lib/magic"
import Header from "@/components/header"

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>({ loading: true })
  console.log("App page user:", user)

  useEffect(() => {
    setUser({ loading: true })

    if (magic) {
      magic.user.isLoggedIn().then((isLoggedIn) => {
        if (isLoggedIn) {
          magic?.user?.getMetadata().then((userData) => setUser(userData))
        } else {
          Router.push("/login")
          setUser(null)
        }
      })
    }
  }, [])

  return (
    <ChakraProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  )
}
