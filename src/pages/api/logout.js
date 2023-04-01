import { removeCookie } from "@/lib/cookie";
import { getUserIdFromToken } from "@/lib/util";
import { magicAdmin } from "@/lib/magic";
import { magic } from "@/lib/magic-link";
import { redirect } from "next/dist/server/api-utils";

export default async function logout(req, res) {
  try {
    if (!req.cookies.token) {
      return res.status(401).send({ msg: "User is not logged in" });
    }
    const token = req.cookies.token;
    const userId = await getUserIdFromToken(token);
    removeCookie(res);
    try {
      await magicAdmin.users.logoutByIssuer(userId);
      // await magic.user.logout();
    } catch (error) {
      console.log("err when logout with magic:", error);
    }

    // redirect user to login page
    //res.writeHead(307, { Location: "/login" });
    res.writeHead(301, {
      Location: "/login",
    });
    res.end();
  } catch (error) {
    console.error({ error });
    res.status(401).json({ message: "User is not logged in" });
  }
}
