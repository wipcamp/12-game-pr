import api from '../utils/apiGamePrService'
import Axios from 'axios';
// import Cookies from './CookieService'

const profileService = {
    getProfile : async (lineId,name) => {
        let res = await Axios.get(`https://12-gameservice.freezer.wip.camp/profileGamePr?id=${lineId}&name=${name}`)
        return res;
    },
    arcadeGameOver : async (lineId,score) => {
        let res = await Axios.put(`https://12-gameservice.freezer.wip.camp/gamePrGameOver?id=${lineId}&score=${score}`)
        return res;
    },
    getScoreBoard : async () => {
        let res = await Axios.get(`https://12-gameservice.freezer.wip.camp/scoreBoard`)
        return res;
    }

  
  }
  
  export default profileService

