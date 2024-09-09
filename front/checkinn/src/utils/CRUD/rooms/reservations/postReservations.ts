import axios from "axios";

export const postReservations = async (bookingData: any) => {
  try {
    const response = await axios.post(
      "https://checkinn-3nud.onrender.com/apireservations",
      bookingData
    );
    if (response) console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error al hacer la reserva:", error);
  }
};
