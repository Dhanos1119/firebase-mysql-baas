import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/firebase-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    res.json({
      firebaseToken: response.data.idToken,
    });
  } catch (error) {
    res.status(401).json({ message: "Firebase login failed" });
  }
});

export default router;
