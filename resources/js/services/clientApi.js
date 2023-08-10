import axios from "axios";

/**
 * Local api calls with bearer token
 */
const apiUrl = import.meta.env.VITE_APP_URL;
const clientApi = (bearer) => {
    return axios.create({
        baseURL: apiUrl,
        headers: {
            // Accept: "application/json",
            // "Content-Type": "application/json",
            "Authorization": `Bearer ${bearer}`,
        },
    });
}

const authApi = axios.create({
    baseURL: apiUrl,
    // withCredentials: true,
    // headers: { Accept: "application/json" },
});
export { authApi, clientApi };
