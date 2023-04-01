import { isNewUser, createNewUser } from "@/lib/db/hasura";
import { magicAdmin } from "@/lib/magic";
import jwt from "jsonwebtoken";
import { setCookieToken } from "@/lib/cookie";

export default async function login(req, res) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : ""; // didToken get from magic
      // get meta data from magic (issuer, publicAddress, email) to generate token from JWT
      const metadata = await magicAdmin.users.getMetadataByToken(didToken); // doc: https://magic.link/docs/auth/api-reference/server-side-sdks/node
      // Create jwt: JSON web token doc: https://www.npmjs.com/package/jsonwebtoken
      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-default-role": "user",
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-user-id": `${metadata?.issuer || ""}`,
          },
        },
        process.env.JWT_SECRET
      );
      const isNewUserQuery = await isNewUser(token, metadata?.issuer);
      isNewUserQuery && (await createNewUser(token, metadata));
      setCookieToken(token, res);
      res.send({ done: true });
    } catch (error) {
      console.log("Some thing err when logging in:", error);
      res.status(500).send({ done: false });
    }
  }
}
