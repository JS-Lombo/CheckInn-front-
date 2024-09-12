import axios from "axios";

const loginGoogle = async (
  auth: any,
  provider: any,
  router: any,
  setErrorGoogle: any,
  setIsLoadingGoogle: any,
  setIsSuccessGoogle: any,
  signInWithPopup: any
) => {
  try {
    //___________________________________________LOGIN GOOGLE A FIREBASE_________________________________________
    const result = await signInWithPopup(auth, provider);

    // Guarda el token de Firebase y el UID en el localStorage
    localStorage.setItem("loginToken", JSON.stringify(result.user.accessToken));
    localStorage.setItem("uidFirebaseGoogleLogin", JSON.stringify(result.user.uid));

    //____________________________________POST REGISTER/LOGIN GOOGLE A BACK END______________________________________
    const registerObjetGoogle = {
      name: result.user.displayName,
      email: result.user.email,
    };

    const response = await axios.post(
      "https://checkinn-3nud.onrender.com/auth/login-google",
      registerObjetGoogle
    );

    console.log("respuesta back login google", response);

    // Guarda los datos del usuario provenientes del backend
    const userDataLogin = {
      name: result.user.displayName,
      email: result.user.email,
      id: response.data.user.id,
      roll: response.data.user.roll,
      accountId: response.data.user.accountId,
      accessToken: response.data.accessToken,
    };

    // Guarda toda la información en el localStorage
    localStorage.setItem("userDataLogin", JSON.stringify(userDataLogin));

    setErrorGoogle(null);
    setIsSuccessGoogle(true);
    router.push("/");
  } catch (error: any) {
    console.log("error firebase google login", error);
    setErrorGoogle(error.response);
    setIsSuccessGoogle(false);
  } finally {
    setIsLoadingGoogle(false);
  }
};

export default loginGoogle;
