import { useEffect } from "react"
import Router, { useRouter } from "next/router"
import { magic } from "../lib/magic"
import { useUserContext } from "../lib/UserContext"
import { Spinner, Flex } from "@chakra-ui/react"

const Callback = () => {
  const router = useRouter()
  const { setUser } = useUserContext()

  // The redirect contains a `provider` query param if the user is logging in with a social provider
  useEffect(() => {
    router.query.provider ? finishSocialLogin() : finishEmailRedirectLogin()
    console.log("router.query: ", JSON.stringify(router.query, null, 2))
  }, [router.query])

  // `getRedirectResult()` returns an object with user data from Magic and the social provider
  const finishSocialLogin = async () => {
    console.log("finishing social login")
    let result = await magic?.oauth.getRedirectResult()
    console.log("getRedirectResult: ", result)
    authenticateWithServer(result?.magic.idToken)
  }

  // `loginWithCredential()` returns a didToken for the user logging in
  const finishEmailRedirectLogin = () => {
    if (router.query.magic_credential)
      magic?.auth.loginWithCredential().then((didToken) => {
        if (didToken) {
          authenticateWithServer(didToken)
        }
      })
  }

  // Send token to server to validate
  const authenticateWithServer = async (didToken?: string) => {
    console.log("authenticating with server")
    let res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
    })

    console.log("res:", res)

    if (res.status === 200) {
      let userMetadata = await magic?.user.getMetadata()
      if (userMetadata && setUser) {
        await setUser(userMetadata)
      }
      Router.push("/profile")
    }
  }

  return (
    <Flex justifyContent="center">
      <Spinner size="xl" color="blue.500" />
    </Flex>
  )
}

export default Callback
