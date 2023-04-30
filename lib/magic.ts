import { Magic } from "magic-sdk"
import { OAuthExtension } from "@magic-ext/oauth"
import { SDKBase, InstanceWithExtensions } from "@magic-sdk/provider"

type MagicInstanceWithOAuthExtension = InstanceWithExtensions<
  SDKBase,
  { oauth: OAuthExtension }
>

// Create client-side Magic instance
const createMagic = (key: string): MagicInstanceWithOAuthExtension | null => {
  if (typeof window === "undefined") {
    return null
  }

  return new Magic(key, {
    extensions: [new OAuthExtension()],
  })
}

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!)
