export const routeGuard = ()=>{
    const token = localStorage.getItem("accessToken")
    const flag = token ? true : false

    return flag
}