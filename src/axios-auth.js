import axios from "axios";

const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: 'AIzaSyCvE6MBvfoUZbjkSNAX_2FnfR7PymZICfk'
    }
})

export default instance;