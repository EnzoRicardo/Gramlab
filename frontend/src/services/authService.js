import { data } from "react-router-dom";
import { api, requestConfig } from "../utils/config";

//Registrar um usuario
const register = async(data) => {
    const config = requestConfig("POST", data);

    try {
        const res = await fetch(api + "/users/register", config)
            .then((res) => res.json())
            .catch((err) => err);
        if(res._id) {
            localStorage.setItem("user", JSON.stringify(res));
        }

        return res;
    } catch (error) {
        console.log(error)
    }
}

//Deslogar
const logout = () => {
    localStorage.removeItem("user");
};

//Logar um usuario
const login = async(data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/users/login", config)
                     .then((res) => res.json())
                     .catch((err) => err)

        if(res._id) {
            localStorage.setItem("user", JSON.stringify(res))
        }
        return res;

    } catch (error) {
        console.log(error);
    }
};


const authService = {
    register,
    logout,
    login
};

export default authService;