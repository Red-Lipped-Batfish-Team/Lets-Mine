import axios from "axios";

const getUserId = async () => {
  const token = sessionStorage.getItem("token");

  const res = await axios.post(
    "/auth/session",
    { token },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.userId;
};

export default getUserId;
