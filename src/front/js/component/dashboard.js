import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";

export const Dashboard = () => {
  const { store, actions } = useContext(Context);
  const [checkValidate, setCheckValidate] = useState(false);
  let history = useHistory();

  useEffect(() => {
    validate();
  }, []);

  const validate = async () => {
    if (!(await actions.validate())) {
      history.push("/");
    } else {
      setCheckValidate(true);
    }
  };

  return (
    <>
      {checkValidate ? (
        <div className="text-center lead mt-5">
          <p>
            Hello, this page is only visible if the login was success, so...
            congrats!
          </p>
        </div>
      ) : null}
    </>
  );
};

// let history = useHistory();

// useEffect(() => {
//   if (!validate()) {
//     history.push("/");
//   }
// }, []);
// const validate = async () => {
//   return await actions.validate();
// };
