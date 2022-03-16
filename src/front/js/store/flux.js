const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      logged: true,
    },
    actions: {
      validate: async () => {
        const response = await fetch(
          "https://3001-4geeksacademy-reactflask-otygq2y2sit.ws-eu34.gitpod.io/api/validate",
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
    },
  };
};

export default getState;
