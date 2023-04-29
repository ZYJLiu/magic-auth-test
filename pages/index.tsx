import { useContext } from "react"
import { UserContext, User } from "../lib/UserContext"
import Loading from "../components/loading"
import { magic } from "../lib/magic"
import { Button } from "@chakra-ui/react"

const Home = () => {
  const user = useContext<User | null>(UserContext)

  const logout = () => {
    magic.user.logout()
  }

  return (
    <>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <div>
            You're logged in!{" "}
            <a>
              <Button onClick={logout}>Logout</Button>
            </a>
          </div>
        )
      )}
    </>
  )
}

export default Home
