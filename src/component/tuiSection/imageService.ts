import axios from "axios";

// Function to fetch images from the server
export const fetchImages = async () => {
  try {
    const resp = await axios.get(`http://localhost:5000/image`); // Send a GET request to fetch images
    return resp.data; // Return the data received from the response
  } catch (err) {
    console.error(err); // Log any errors that occur during the request
    return []; // Return an empty array in case of an error
  }
};

// Function to save an image to the server
export const saveImage = async (data: any) => {
  try {
    const resp = await axios.post(`http://localhost:5000/image/create`, data); // Send a POST request to save an image
    console.log(resp); // Log the response object to the console
  } catch (err) {
    console.error(err); // Log any errors that occur during the request
  }
};
