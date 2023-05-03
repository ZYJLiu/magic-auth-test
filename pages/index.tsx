import { useUserContext } from "../lib/UserContext"
import { Text, Spinner, Flex } from "@chakra-ui/react"
import Router from "next/router"
import { magic } from "../lib/magic"
import { useEffect } from "react"

const Home = () => {
  const { user, setUser } = useUserContext()

  useEffect(() => {
    if (magic) {
      magic.user.isLoggedIn().then((isLoggedIn) => {
        if (isLoggedIn) {
          magic?.user?.getMetadata().then((userData) => {
            setUser(userData)
          })
        } else {
          Router.push("/login")
        }
      })
    }
  }, [])

  return (
    <>
      <Flex justifyContent="center">
        {user?.loading ? (
          <Spinner size="xl" color="blue.500" />
        ) : (
          user?.issuer && <Text fontSize="xl">You're logged in!</Text>
        )}
      </Flex>
    </>
  )
}

export default Home
