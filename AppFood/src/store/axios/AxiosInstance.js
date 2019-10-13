import Axios from 'axios'
import Config from 'react-native-config'
const URL = "https://serverappfood.herokuapp.com/"

const isntance = Axios.create({
    baseURL: URL,
    timeout: 20000,
})

isntance.interceptors.request.use(function(config) {
    //token when has save to local
    return config   
}, function (error) {
    // Do something with request error
    console.log("error" +JSON.stringify(error))
    return Promise.reject(error);
})

export default isntance