import Axios from 'axios'
import Config from 'react-native-config'

const axios = Axios.create({
    baseURL: Config.SERVER_URL,
    timeout: 20000,
})

axios.interceptors.request.use(function(config) {
    console.log(JSON.stringify(config))
    //token when has save to local
    return config   
}, function (error) {
    // Do something with request error
    console.log("error" +JSON.stringify(error))
    return Promise.reject(error);
})

export default axios