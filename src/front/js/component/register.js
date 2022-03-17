import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useHistory } from "react-router-dom";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState({});
  let history = useHistory();

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col col-sm-10 col-md-10 col-lg-6 text-center mt-5">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Username
            </span>
            <input
              type="text"
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
              className="form-control"
              placeholder="Ihopethisworks"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Password
            </span>
            <input
              type="password"
              className="form-control"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              placeholder="Thisismadness"
              aria-label="Password"
              aria-describedby="basic-addon1"
            />
          </div>
          <button
            onClick={() => {
              fetch(
                "https://3001-jorgepardor-jwtauthentic-27b4o6b76ht.ws-eu38.gitpod.io/api/register",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(user),
                }
              )
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  if (data.token) {
                    localStorage.setItem("token", data.token);
                    history.push("/dashboard");
                  } else {
                    alert("error");
                  }
                });
            }}
            type="button"
            className="btn btn-primary btn-sm me-1"
          >
            Register
          </button>
          <button type="button" className="btn btn-secondary btn-sm ms-1">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
