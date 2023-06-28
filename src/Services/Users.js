// const axios = window.axios;
// const url =
//   "https://my-json-server.typicode.com/kellybuchanan/WebDev-Spring2021";

// // This hook uses JSON data to provide data for the UserList child component

// export const createUser = (id, firstName, lastName, email, password) => {
//   return axios({
//     method: "post",
//     url: `${url}/users`,
//     data: {
//       id,
//       firstName,
//       lastName,
//       email,
//       password
//     },
//     headers: {
//       "Content-Type": "application/json"
//     },
//     json: true
//   })
//     .then((response) => {
//       console.log("POST response: ", response);
//     })
//     .catch((err) => {
//       console.log("POST error: ", err);
//     });
// };

// export const getAllUsers = () => {
//   return (
//     axios
//       // .get(`${url}/users`)
//       .get("./Services/users.json")
//       .then((response) => {
//         console.log(response.data);
//         return response.data;
//       })
//       .catch((err) => {
//         console.log("GET Error: ", err);
//       })
//   );
// };
