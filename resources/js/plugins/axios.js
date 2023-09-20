import axios from 'axios'
import { useAuthUserStore } from '../store/AuthStore'
import router from '../router'


const http = axios.create({
  baseURL: `/api/v1/`,
  validateStatus: status=>{
    if(status === 401){
      const auth = useAuthUserStore()

      auth.setUser()
      router.push({ path: 'login' })

    }

    return status >= 200 && status < 300
  },
})

http.interceptors.request.use(config => {
  const auth = useAuthUserStore()

  config.headers.Authorization = `Bearer ${auth.token}`

  return config
})


export default http
