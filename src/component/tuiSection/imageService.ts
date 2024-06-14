
import axios from "axios";

export const fetchImages = async () => {
  try {
    const resp = await axios.get(`http://localhost:5000/image`);
    return resp.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const saveImage = async (data: any) => {
  try {
    const resp = await axios.post(`http://localhost:5000/image/create`, data);
    console.log(resp);
  } catch (err) {
    console.error(err);
  }
};
