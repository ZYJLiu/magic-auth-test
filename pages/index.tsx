import { useContext } from "react"
import { UserContext } from "../lib/UserContext"
import Loading from "../components/loading"
import { magic } from "../lib/magic"
import { Button } from "@chakra-ui/react"

const Home = () => {
  const context = useContext(UserContext)
  const { user, setUser } = context || {}

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
