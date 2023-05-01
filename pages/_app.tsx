import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { UserProvider } from "../lib/UserContext"
import Header from "@/components/header"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <UserProvider>
        <Header />
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  )
}
