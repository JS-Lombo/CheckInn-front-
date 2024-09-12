import axios from "axios";
import Swal from "sweetalert2";

const loginUserFireBase = async (
  formData: any,
  auth: any,
  signInWithEmailAndPassword: any,
  router: any
) => {
  try {
    //___________________________________________POST LOGIN A FIREBASE_________________________________________
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    
    //TOKEN LOGIN FIREBASE, CARGO AL LOCALSTORAGE
    const user = JSON.stringify(userCredential.user.accessToken);
    localStorage.setItem("loginToken", user);
    
    //UID LOGIN FIREBASE, CARGO AL LOCALSTORAGE /--> este token lo envía al backend para recibir otro
    const userUid = userCredential.user.uid;
    JSON.stringify(userUid); 
    
    //__________________________________________POST LOGIN A BACK END_________________________________________
    const loginObjet = {
      phone: formData.phone,
      email: formData.email,
      password: formData.password
    };

    const response = await axios.post(
      "https://checkinn-3nud.onrender.com/auth/login",
      loginObjet
    );

    //USERDATA LOGIN
    if (response.data.user) {
      const userDataLogin: any = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        phone: response.data.user.phone,
        accountId: response.data.user.accounts[0].id,
        accounts: {
          photo: response.data.user.accounts[0].photo,
        },
      };
      const newData = JSON.stringify(userDataLogin);
      localStorage.setItem("userDataLogin", newData);

      router.push("/");
      /*     setIsSuccess(true);
    setError(null); */
      /*     setTimeout(() => {
      router.push("/");
    }, 2000); */

    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("Error en el inicio de sesión:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "An error occurred during login. Please try again.",
      confirmButtonText: "Aceptar",
    });
  }
};

export default loginUserFireBase;
