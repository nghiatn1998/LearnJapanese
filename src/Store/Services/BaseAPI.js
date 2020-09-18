import axios from 'axios';
import APIConfig from '../../Config/APIConfig'

const instance = axios.create({
    baseURL: `${APIConfig.baseUrl}/api`
});

export default instance;
