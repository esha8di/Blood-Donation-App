import axios from "axios";

const axiosintance= axios.create({
    baseURL:'http://localhost:5173'
})

const useAxios=()=>{
    return axiosintance
}

export default useAxios;