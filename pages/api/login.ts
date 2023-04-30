import { NextApiRequest, NextApiResponse } from "next"
import { Magic } from "@magic-sdk/admin"

const magic = new Magic(process.env.MAGIC_SECRET_KEY as string)

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const didToken = req.headers.authorization?.substr(7) as string
    await magic.token.validate(didToken)
    res.status(200).json({ authenticated: true })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: "An unknown error occurred." })
    }
  }
}
