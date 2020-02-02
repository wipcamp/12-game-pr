import api from '../utils/apiGamePrService'
// import Cookies from './CookieService'

const profileService = {
    getProfile : async (lineId,name) => {
        let res = await api.get(`/profileGamePr?id=${lineId}&name=${name}`)
        return res;
    },
    arcadeGameOver : async (lindId,score) => {
        let res = await api.put(`/gamePrGameOver?id=${lineId}&score=${score}`)
        return res;
    },
    getScoreBoard : async () => {
        let res = await api.get(`/scoreBoard`)
        return res;
    }

  
  }
  
  export default profileService

