import axios from "axios";

const registerUserFirebase = async (
  formData: any,
  auth: any,
  createUserWithEmailAndPassword: any /* 
  errors: any,
  router: any,
  setErrors: any,
  setErrorBack: any,
  setIsSuccess: any,
  setIsLoading: any,
  setToken: any */
) => {
  try {
    //___________________________________________POST REGISTER A FIREBASE_________________________________________
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password,
      formData.name,
      formData.passwordConfirmation,
      formData.phone
    );
    // DATA USUARIO REGISTRADO
    const userFirebase = userCredential.user; // Objeto que contiene información del usuario registrado (token, mail, etc).

    // Obtener el token de Firebase
    const token = await userFirebase.getIdToken();
    localStorage.setItem("loginToken", token);
    //___________________________________________POST REGISTER A BACK END_________________________________________

    const dataRegisterBack = {
      email: formData.email,
      name: formData.name,
      password: formData.password,
      passwordConfirmation: formData.passwordConfirmation,
      phone: formData.phone,
    };
    console.log(dataRegisterBack);
    const response = await axios.post(
      "http://localhost:8080/auth/signUp",
      dataRegisterBack
    );

    console.log(response.data);
    //DATA CARGADA AL LOCALSTORAGE (token, id)
    const dataRegisterBackLog = {
      name: formData.name,
      email: userFirebase.email,
      id: response.data.id,
      roll: response.data.roll,
      phone: formData.phone,
      accountId: response.data.accountId,
      token: response.data.token,
    };
    const newData = JSON.stringify(dataRegisterBackLog);
    localStorage.setItem("userDataLogin", newData);
    /*  setIsSuccess(true);
    setErrors({}); */
    setTimeout(() => {
      /*  router.push("/"); */
    }, 2000);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error en el registro:", errorCode, errorMessage);
    console.log(error);
    /*   setErrors({ ...errors, submit: errorMessage });
    setErrorBack(error.response); */
  } finally {
    window.location.reload();
  }
};

export default registerUserFirebase;
