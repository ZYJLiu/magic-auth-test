import { useUserContext } from "../lib/UserContext"
import { VStack, Box, Text, Spinner, Flex, Heading } from "@chakra-ui/react"
import { useEffect } from "react"
import Router from "next/router"
import { magic } from "../lib/magic"

const Profile = () => {
  const { user, setUser } = useUserContext()
  console.log("Profile:", JSON.stringify(user, null, 2))

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
    <Flex justifyContent="center">
      {user === null || user.loading ? (
        <>
          <Spinner size="xl" color="blue.500" />
        </>
      ) : (
        // <Loading />
        user?.issuer && (
          <Box
            p={6}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
            w="80%"
            maxW="500px"
          >
            <Heading mb={6} textAlign="center">
              Profile
            </Heading>
            <VStack alignItems="flex-start" spacing={6}>
              <Box>
                <Text fontWeight="bold" color="blue.500">
                  Issuer
                </Text>
                <Text wordBreak="break-word" overflowWrap="break-word">
                  {user.issuer}
                </Text>
              </Box>

              <Box>
                <Text fontWeight="bold" color="blue.500">
                  Public Address
                </Text>
                <Text wordBreak="break-word" overflowWrap="break-word">
                  {user.publicAddress}
                </Text>
              </Box>

              <Box>
                <Text fontWeight="bold" color="blue.500">
                  Email
                </Text>
                <Text wordBreak="break-word" overflowWrap="break-word">
                  {user.email}
                </Text>
              </Box>

              <Box>
                <Text fontWeight="bold" color="blue.500">
                  MFA Enabled
                </Text>
                <Text>{user.isMfaEnabled ? "Yes" : "No"}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold" color="blue.500">
                  Phone Number
                </Text>
                <Text>{user.phoneNumber || "Not provided"}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold" color="blue.500">
                  Wallet Type
                </Text>
                <Text>{user.walletType}</Text>
              </Box>
            </VStack>
          </Box>
        )
      )}
    </Flex>
  )
}

export default Profile
