import axios from "axios";

const getItem = async (itemId) => {
  const item = await axios.get(`/api/items/${itemId}`);
  console.log(item);

  return item.data;
};

export default getItem;
