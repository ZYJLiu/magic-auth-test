import { useUserContext } from "../lib/UserContext"
import Loading from "../components/loading"
import { Center, Text } from "@chakra-ui/react"
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
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <Center>
            <Text fontSize="xl">You're logged in!</Text>
          </Center>
        )
      )}
    </>
  )
}

export default Home
