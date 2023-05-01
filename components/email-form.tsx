import { useState } from "react"
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Box,
  Heading,
} from "@chakra-ui/react"
import { EmailIcon, ArrowForwardIcon } from "@chakra-ui/icons"

interface EmailFormProps {
  onEmailSubmit: (email: string) => void
  disabled?: boolean
}

const EmailForm: React.FC<EmailFormProps> = ({ onEmailSubmit, disabled }) => {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onEmailSubmit(email)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Heading as="h3" textAlign="center" fontSize="xl" mt={6} mb={8}>
          Login
        </Heading>
        <InputGroup size="md" mb={6} mx="auto" w="80%">
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <Box textAlign="center">
          <Button
            leftIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            size="md"
            disabled={disabled}
            onClick={handleSubmit}
          >
            Send Magic Link
          </Button>
        </Box>
      </form>
    </>
  )
}

export default EmailForm
