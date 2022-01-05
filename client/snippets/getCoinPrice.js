import axios from "axios";

const getCoinPrice = async (hashrate) => {
const coin = await axios.get("/api/coins");
    console.log(coin)
    const arr = coin.data.coins;

   const coinPrice = arr.filter(elem => elem.hashrate_id===hashrate
  )

  return coinPrice[0].rental_price;
};

export default getCoinPrice;


