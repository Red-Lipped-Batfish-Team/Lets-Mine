import React, { useState, useEffect, useNavigate } from "react";
import getUserId from "../snippets/getUserId";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  //useEffect
  //create transaction
  //update item inventory
  //delete cart

  const [session, setSession] = useState({});
  const [user, setUser] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {

    const getUserInfo = async () => {
      const userId = await getUserId();
      const userInfo = await axios.get(`/api/users/${userId}`)
      setUser({
        id: userInfo.data.user.id,
        firstName: userInfo.data.user.first_name,
        lastName: userInfo.data.user.last_name,
        email: userInfo.data.user.email,
      })
    }
    getUserInfo();

  }, [])


  return (
    <>
    <div style={{
      display: 'block',
      justifyContent: 'center',
      height: '90vh',
      paddingTop: '30px',
    }}
    >
      <div style={{
        display: 'block',
      }}>
      <h4>Thank you for your order, {user.firstName}!</h4>
      </div>
      <div style={{
        display: 'block',
      }}><br/>
        <p>You should receive an Email to {user.email} shortly!</p>
      </div>
      <Link to="/marketplace">
        <Button variant='contained'>Continue Shopping</Button>
      </Link>
    </div>

    </>
  )
};

export default SuccessPage;
