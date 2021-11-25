import axios from 'axios';
const http = axios.create({
    baseURL: "http://localhost:3000/admin/api"
})
http.interceptors.request.use(config => {
    if (sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + sessionStorage.token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use(res => {
    return res;
}, err => {
    return err
})

export default http