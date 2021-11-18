import nc from "next-connect";
import { app } from "../../../../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import cookie from "cookie";
const handler = nc();
const cors = require("micro-cors")();

handler.post(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const auth = getAuth();
  try {
    const ress = await signInWithEmailAndPassword(auth, email, password);
    console.log(ress);

    res.setHeader(
      "Access-Control-Allow-Origin",
      "*",
      "Set-Cookie",

      cookie.serialize("token", ress.user.stsTokenManager.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "strict",
        path: "/",
      })
    );

    res.json({ user: ress.user });
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default handler;
