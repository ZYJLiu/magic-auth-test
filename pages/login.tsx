import { useState, useEffect, useContext } from "react"
import Router from "next/router"
import { magic } from "../lib/magic"
import { UserContext } from "../lib/UserContext"
import EmailForm from "../components/email-form"
import SocialLogins from "../components/social-logins"
import { OAuthProvider } from "@magic-ext/oauth"

const Login = () => {
  const [disabled, setDisabled] = useState(false)
  const { user, setUser } = useContext(UserContext)

  // // Redirect to /profile if the user is logged in
  // useEffect(() => {
  //   if (user?.issuer) Router.push("/profile")
  // }, [user])

  async function handleLoginWithEmail(email: string) {
    try {
      setDisabled(true)

      let didToken = await magic?.auth.loginWithMagicLink({
        email,
        redirectURI: new URL("/callback", window.location.origin).href,
      })

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + didToken,
        },
      })

      if (res.status === 200) {
        let userMetadata = await magic?.user.getMetadata()
        if (userMetadata) {
          await setUser(userMetadata)
        }
        Router.push("/profile")
      }
    } catch (error) {
      setDisabled(false)
      console.log(error)
    }
  }

  async function handleLoginWithSocial(provider: OAuthProvider) {
    await magic?.oauth.loginWithRedirect({
      provider,
      redirectURI: new URL("/callback", window.location.origin).href,
    })
  }

  return (
    <div className="login">
      <EmailForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
      <SocialLogins onSubmit={handleLoginWithSocial} />
      <style jsx>{`
        .login {
          max-width: 20rem;
          margin: 40px auto 0;
          padding: 1rem;
          border: 1px solid #dfe1e5;
          border-radius: 4px;
          text-align: center;
          box-shadow: 0px 0px 6px 6px #f7f7f7;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default Login
