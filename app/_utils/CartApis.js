const { default: axiosClient } = require("./axiosClient");

const addToCart = (payload) => axiosClient.post("/carts", payload);

const getUserCartItems = (email) =>
  axiosClient.get(
    `carts?populate[products][populate]=banner&filters[email][$eq]=${email}`
  );

  const deleteCartItem = async (id) => {
    try {
        const response = await axiosClient.delete(`/carts/${id}`);
        
        // Check the status code to ensure the request was successful
        if (response.status === 200 ) {
            console.log(`Item with ID ${id} successfully deleted`);
            return response.data; // Return the actual data (if available)
        } else {
            console.error(`Failed to delete item. Status code: ${response.status}`);
            return null; // Handle case when the response is not successful
        }
    } catch (error) {
        console.error(`Error deleting item with ID ${id}:`, error);
        return null; // Return null in case of an error
    }
};
export default {
  addToCart,
  getUserCartItems,
  deleteCartItem,
};
