import { Box, Center, Image } from "@chakra-ui/react"

const Loading = () => (
  <Center w="100vw">
    <Image src="./spinner.svg" boxSize="50px" alt="Loading" />
  </Center>
)

export default Loading
