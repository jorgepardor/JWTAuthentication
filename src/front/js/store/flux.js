const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      logged: false,
    },
    actions: {
      validate: async () => {
        const response = await fetch(
          "https://3001-jorgepardor-jwtauthentic-27b4o6b76ht.ws-eu38.gitpod.io/api/validate",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setStore({ logged: data.validate });
        return data.validate;
      },

      logout: (redirectToLogin) => {
        setStore({ logged: false });
        localStorage.removeItem("token");
        redirectToLogin();
      },
    },
  };
};

export default getState;
