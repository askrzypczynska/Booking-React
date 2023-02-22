import axios from "axios";

const instance = axios.create({
    baseURL: 'https://booking-site-c6d19-default-rtdb.europe-west1.firebasedatabase.app'
})

export default instance;