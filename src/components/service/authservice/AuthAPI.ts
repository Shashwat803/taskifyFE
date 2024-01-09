import axios from "axios"
import { User } from "../../model/UserModel"
import { authHeader } from "./Auth-header"
const Baseurl : string = "https://taskify-be.onrender.com/api/users"

const api = axios.create({
    baseURL:Baseurl,
    withCredentials:true
})


export const createUser = async(formData:User)=>{
  try {
    const response = await api.post('/register', formData)
    return response
  } catch (error) {
    console.log(error)
   }
  }

  export const loginUser = async(formData:any)=>{
    try {
        const response = await api.post('/login', formData)
        return response
    } catch (error) {
        console.log(error)
    }
  }

  export const logoutUser = ()=>{
    try {
      localStorage.removeItem('accessToken')
    } catch (error) {
      console.log(error);
      
    }
  }

  export const currentUser = async() =>{
    try {
      const response = await api.get('/currentUser', {headers:authHeader()})
      return response
    } catch (error) {
      console.log(error);
      
    }
  }