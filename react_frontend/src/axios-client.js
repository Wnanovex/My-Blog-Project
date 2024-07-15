import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use(request => {
    let token = localStorage.getItem('ACCESS_TOKEN');
    request.headers.Authorization = `Bearer ${token}`;
    return request;
})

axiosClient.interceptors.response.use(response => {
    return response;
}, ( error => {

    try{
        const {response} = error;
        if(response.status === 401){
            localStorage.removeItem('ACCESS_TOKEN');
        }
     }catch(e){
        console.log(e);
     }

     throw error;
})

)

export default axiosClient;
