import { preloadScene } from '../utils/preloadScene'
import { startScene } from '../utils/goTo'
import Cookies from 'js-cookie';
import lineService from "../services/LineService";
import gamePrService from "../services/GamePrService";
import axios from 'axios'
let background
let gameName
let howToPlay
let storyMode
let arcadeMode
let MainMenu_song
const clientId = '1653703435'
const callbackGamePrUrl = 'https://12-gamepr.freezer.wip.camp'
let token = {}
class MainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainMenu'
        })
    }


    async init(data) {
        const search = window.location.search.substring(1)
        if (search) {
            const resFromLineApi = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
            const stateInCookie = Cookies.get('state')
            if (stateInCookie === resFromLineApi.state) {
                this.getTokenFromLineApi(resFromLineApi.code, Cookies.get('nonce'))
                Cookies.remove('state');
                Cookies.remove('nonce');
            } else {
                Cookies.remove('state');
                Cookies.remove('nonce');
                window.location.href = callbackGamePrUrl
                console.log('check state fail')
            }
        } else {
            if (!data.token) {
                const stateGenerate = await lineService.getGenerateCode()
                const nonceGenerate = await lineService.getGenerateCode()
                Cookies.set('state', stateGenerate.data)
                Cookies.set('nonce', nonceGenerate.data)
                let stateInCookies = Cookies.get('state')
                const nonceInCookies = Cookies.get('nonce')
                window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${callbackGamePrUrl}&state=${stateInCookies}&scope=openid%20email%20profile&nonce=${nonceInCookies}`
            }
        }
    }

    preload() {
        this.load.image('bg', 'src/images/BG.png')
        this.load.image('gameName', 'src/images/GameName.png')
        this.load.image('howToPlay', 'src/images/Box_H2P.png')
        this.load.image('storyM', 'src/images/Button_Story.png')
        this.load.image('arcadeM', 'src/images/Button_Arcade.png')
        this.load.audio('MainMenu_song', 'src/songs/BG.mp3')
        /////////////////////////////////////////////////////////////////////////////////////////////////////////

        preloadScene({
            scene: this,
            key: 'default'
        })
    }
    create() {
        background = this.add.image(0, 0, 'bg').setOrigin(0, 0)
        gameName = this.add.image(300, 100, 'gameName')
        howToPlay = this.add.image(300, 420, 'howToPlay')
        storyMode = this.add.image(200, 730, 'storyM')
        arcadeMode = this.add.image(400, 730, 'arcadeM')
        MainMenu_song = this.sound.add('MainMenu_song', { volume: 0.15 })
        MainMenu_song.play()
        storyMode.setInteractive()
        arcadeMode.setInteractive()
        //////////////////////////////////////////////////////////////////////////////////////////
        storyMode.on('pointerdown', (pointer) => {
            MainMenu_song.stop()
            this.scene.start('ComicPage1',token);
        });
        //////////////////////////////////////////////////////////////////////////////////////////
        arcadeMode.on('pointerdown', (pointer) => {
            MainMenu_song.stop()
            this.goToArcadeMode()
        })

    }

    goToArcadeMode() {
        startScene.call(this, 'ArcadeMode'.token)
    }

    update(delta, time) {

    }

    async getTokenFromLineApi(code, nonce) {
        const objectResponse = await LineService.lineLogin(code, nonce)
        if (objectResponse == null) {
            window.location.href = callbackGamePrUrl
        }
        const userObject = await gamePrService.getProfile(objectResponse.data.userId,objectResponse.data.name)
        const tokenObject = {
            scope: objectResponse.data.scope,
            access_token: objectResponse.data.access_token,
            token_type: objectResponse.data.token_type,
            expires_in: objectResponse.data.expires_in,
            id_token: objectResponse.data.id_token,
            userId: objectResponse.data.userId,
            userName: objectResponse.data.name,
            highScore: userObject.data.highScore
        }
        token = tokenObject
    }

} export default MainMenu
