import api from '../utils/apiGamePrService'
import Axios from 'axios';
// import Cookies from './CookieService'

const profileService = {
    getProfile : async (lineId,name) => {
        let res = await api.put(`/profileGamePr?id=${lineId}&name=${name}`)
        return res;
    },
    arcadeGameOver : async (lineId,score) => {
        let res = await api.put(`/gamePrGameOver?id=${lineId}&score=${score}`)
        return res;
    },
    getScoreBoard : async () => {
        let res = await api.get(`/scoreBoard`)
        return res;
    },
    getHighScore : async (id) => {
        let res = await api.get(`/getHighScore?id=${id}`)
        return res
    }

  
  }
  
  export default profileService

