import axios from "axios";

const axiosintance= axios.create({
    baseURL:'https://backend-tau-rust-31.vercel.app'
})

const useAxios=()=>{
    return axiosintance
}

export default useAxios;