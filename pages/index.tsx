import { useContext, useEffect } from "react"
import { UserContext } from "../lib/UserContext"
import Loading from "../components/loading"
import { magic } from "../lib/magic"
import { Button } from "@chakra-ui/react"
import Router from "next/router"

const Home = () => {
  const { user, setUser } = useContext(UserContext)
  // const { user, setUser } = context || {}

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
        user?.issuer && <div>You're logged in! </div>
      )}
    </>
  )
}

export default Home
