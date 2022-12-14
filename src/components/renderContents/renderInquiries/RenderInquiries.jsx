import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import AuthContext from "../../../context/AuthContext";
import FormError from "../../common/FormError";
import Loading from "../../common/Loading";
import { INQUIRIES } from "../../../constants/api";
// This is the heroku api I created and used for this project
// https://holidaze-heroku-api.herokuapp.com

const authKey = JSON.parse(localStorage.getItem("auth"));

const API = process.env.REACT_APP_BASE_URL + INQUIRIES;

export default function RenderInquiry() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [auth, setAuth] = useContext(AuthContext)

  let history = useHistory();
  if (!authKey) {
    history.push("/");
  }

  useEffect(function () {
    async function getInquiry() {
      try {
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authKey.jwt}`,
          },
        };
        const response = await axios.get(API, options);

        setInquiries(response.data.data);
      
        // setAuth(response.data.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getInquiry();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <FormError>{error}</FormError>;
  }
  return (
    <>
      {inquiries.map((inquiry) => {
        return (
          <Link key={inquiry.id} to={`inquiryDetails/${inquiry.id}`}>
            <div className="render-items">
              <p className="render-name">{inquiry.attributes.fullname + " :"}</p>
              <p>{inquiry.attributes.message}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}
