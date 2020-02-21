import axios from 'axios'
import api from '../utils/apiLineService'
// import Cookies from './CookieService'

const lineService = {
    lineLogin : async (code,nonce,url) => {
        let res = await api.get(`/auth?code=${code}&url=${url}&nonce=${nonce}`)
        return res;
    },
    getGenerateCode : async()=>{
        let res = await api.get(`/getGenerateCode`)
        return res;
    }
  }
  
  export default lineService

