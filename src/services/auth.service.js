import axios from "axios";

const API_URL = "http://localhost:8081/api/auth/";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "signin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    signUp(email, password, roleName, code) {
        return axios.post(API_URL + "signup", {
            email,
            password,
            roleName,
            code
        });
    }

    registerPerson(personDTO, roleName, apartmentDTO, companyName) {
        return axios.post(API_URL + "registerPerson", {
            personDTO,
            roleName,
            apartmentDTO,
            companyName
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();
