import axios from 'axios'
// import Cookies from './CookieService'

const lineService = {
    lineLogin : async (code,nonce) => {
        let res = await axios.get(`https://12-lineservice.freezer.wip.camp/auth?code=${code}&nonce=${nonce}`)
        return res;
    },
    getGenerateCode : async()=>{
        let res = await axios.get(`https://12-lineservice.freezer.wip.camp/getGenerateCode`)
        return res;
    }
  }
  
  export default lineService

