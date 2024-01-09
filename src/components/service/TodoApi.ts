import axios from "axios"
import { authHeader } from "./authservice/Auth-header"
const Baseurl: string = "https://taskify-be.vercel.app/api"

const api = axios.create({
    baseURL: Baseurl,
    withCredentials: true
})

export const getAllTodos = async () => {
    try {
        const response = await api.get('/todos', { headers: authHeader() })
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const createTodo = async (todo: any) => {
    try {
        const response = await api.post("/todos", todo, { headers: authHeader() })
        return response.data
    } catch (error) {
        throw new Error("Error while creating todo")
    }
}

export const updateTodo = async (id: number, todo: any) => {
    try {
        const response = await api.put(`/todos/${id}`, todo, {headers:authHeader()})
        return response.data
    }
    catch (error) {
        console.log(error);
        throw new Error("Error while updating")
    }
}

export const deleteTodo = async (id: number) => {
    try {
        const response = await api.delete(`/todos/${id}`, {headers:authHeader()})
        return response.data

    } catch (error) {
        throw new Error("Error while deleting")
    }
}

export const markDone = async (id: number, isDone: any) => {
    try {
        const response = await api.put(`/todos/${id}`, isDone, {headers:authHeader()})
        return response.data
    } catch (error) {
        throw new Error("Error while marking complete")
    }
}

