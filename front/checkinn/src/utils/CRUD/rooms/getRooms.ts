import axios from "axios";

export const getRooms = async () => {
  try {
    const response = await axios.get("https://checkinn-3nud.onrender.com/api/Rooms");
    if (response) console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error get rooms");
  }
};
export const getRoomsByID = async (id: string) => {
  try {
    const response = await axios.get(`https://checkinn-3nud.onrender.com/api/Rooms/${id}`);
    if (response) console.log("Esta es la data by ID:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error al obtener la habitación por ID:", error);
  }
};

