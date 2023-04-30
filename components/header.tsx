import { useContext } from "react"
import Link from "next/link"
import Router from "next/router"
import { magic } from "../lib/magic"
import { UserContext } from "../lib/UserContext"
import { Button } from "@chakra-ui/react"

const Header = () => {
  const context = useContext(UserContext)
  const { user, setUser } = context || {}

  const logout = () => {
    magic?.user.logout().then(() => {
      if (setUser) {
        setUser(null)
      }
      Router.push("/login")
    })
  }

  return (
    <header>
      <nav>
        <ul>
          {user?.loading ? (
            // If loading, don't display any buttons specific to the loggedIn state
            <div style={{ height: "38px" }}></div>
          ) : user?.issuer ? (
            <>
              <li>
                <Link href="/">
                  <Button color="primary" size="sm">
                    Home
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <Button color="primary" size="sm">
                    Profile
                  </Button>
                </Link>
              </li>
              <li>
                <a>
                  <Button color="warning" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </a>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">
                <Button color="primary" size="sm">
                  Login
                </Button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <style jsx>{`
        nav {
          max-width: 45rem;
          margin: 0 auto 50px;
          padding: 1.25rem 1.25rem;
          border-bottom: 1px solid #f0f0f0;
        }
        ul {
          display: flex;
          list-style: none;
        }
        li {
          margin-right: 1.5rem;
          line-height: 38px;
        }
        li:first-child {
          margin-left: auto;
        }
      `}</style>
    </header>
  )
}

export default Header
