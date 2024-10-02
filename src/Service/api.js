import axios from "axios"; 

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3", 
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_ACCESS_TOKEN, 
  },
});

export default api;

// interceptor is axios inistance object
// requesti is two of the type of interceptor
// use is a method
//  config refers to the configuration object of the HTTP request. This object contains all the details of the request, such as the HTTP method, URL, headers, query parameters, body, and more

// Interceptor to dynamically set the token for each request
// api.interceptors.request.use(
//   (config) => {
//     const authStore = useAppStore();

//     // Use a dynamic token if available, otherwise fall back to default token
//     if (config.headers["Custom-Token"]) {
//       config.headers.Authorization = config.headers["Custom-Token"];
//     } else if (authStore.token) {
//       config.headers.Authorization = authStore.token;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


