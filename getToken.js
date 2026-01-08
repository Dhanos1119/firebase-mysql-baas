import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxUfdbtQDkreWuJmM3EcVlFf-44c3G1HM",
  authDomain: "fir-mysql-baas.firebaseapp.com",
  projectId: "fir-mysql-baas",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function login() {
  const userCred = await signInWithEmailAndPassword(
    auth,
    "test@gmail.com",
    "123456"
  );

  const idToken = await userCred.user.getIdToken();
  console.log("🔥 FIREBASE ID TOKEN ↓↓↓\n");
  console.log(idToken);
}

login();




