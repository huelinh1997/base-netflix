const { Magic } = require("magic-sdk");
import { WebAuthnExtension } from "@magic-ext/webauthn";

const createMagic = () => {
  if (typeof window === "undefined") return null;

  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_PUBLISHABLE_API_KEY) // ✨
  );
};
export const magic = createMagic();

// doc: https://magic.link/docs/auth/login-methods/email/integration/web
