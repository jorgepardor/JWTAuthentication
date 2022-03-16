import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
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
              className="form-control"
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
              placeholder="Username"
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
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={async () => {
                const response = await fetch(
                  "https://3001-4geeksacademy-reactflask-otygq2y2sit.ws-eu34.gitpod.io/api/login",
                  {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                  }
                );

                const data = await response.json();
                if (data.token) {
                  localStorage.setItem("token", data.token);
                  history.push("/dashboard");
                } else {
                  alert("error");
                }
              }}
              className="btn btn-primary btn-sm me-1"
            >
              Login
            </button>

            <button
              onClick={() => login(token, username)}
              type="button"
              className="btn btn-secondary btn-sm ms-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
