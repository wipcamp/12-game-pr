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
let viewScoreBoard
const clientId = '1653703435'
const callbackGamePrUrl = 'https://gamepr.wip.camp'
let token = {}
class MainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainMenu'
        })
    }


    async init(data) {
        // console.log(token)
        if (data.userId) {
            token = data
        } else {
            const search = window.location.search.substring(1)
            if (search) {
                const resFromLineApi = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
                const verifyCode = resFromLineApi.verifyCode
                const timeStart = resFromLineApi.timeStart
                const stateFromLine = resFromLineApi.state
                const codeFromLine = resFromLineApi.code
                if (verifyCode && timeStart) {
                    // console.log(verifyCode)
                    // console.log(timeStart)
                    this.scene.start('MiniGame', { verifyCode: verifyCode, timeStart: timeStart })
                } else {
                    if (!stateFromLine || !codeFromLine) {
                        window.location.href = callbackGamePrUrl
                    }
                    // console.log(token)
                    const stateInCookie = Cookies.get('state')
                    if (stateInCookie === stateFromLine) {
                        // console.log('getTokenMethod')
                        this.getTokenFromLineApi(codeFromLine, Cookies.get('nonce'))
                        Cookies.remove('state');
                        Cookies.remove('nonce');
                    } else {
                        // console.log('state in cookies not equal with substring url param')
                        Cookies.remove('state');
                        Cookies.remove('nonce');
                        if (!data.userId) {
                            // console.log('!data if')
                            window.location.href = callbackGamePrUrl
                        } else {
                            // console.log('else')
                            token = data
                            // console.log('test token' + token)
                            // console.log(token)
                            // console.log(data)
                        }
                        // console.log('check state fail')
                    }
                }
            } else {
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
        this.load.image('bg', './images/BackGround01.png')
        this.load.image('gameName', './images/GameName.png')
        this.load.image('howToPlay', './images/Box_H2P.png')
        this.load.image('storyM', './images/Button_Story.png')
        this.load.image('arcadeM', './images/Button_Arcade.png')
        this.load.image('viewScoreBoard', './images/Button_ViewScore.png')
        this.load.image('BgPre', './images/galaxy.jpg');
        this.load.audio('MainMenu_song', './songs/BG.mp3')

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
        storyMode = this.add.image(430, 730, 'storyM').setScale(1.2)
        arcadeMode = this.add.image(180, 730, 'arcadeM').setScale(1.2)
        viewScoreBoard = this.add.image(515, 40, 'viewScoreBoard').setScale(0.8)
        MainMenu_song = this.sound.add('MainMenu_song', { volume: 0.15 })
        MainMenu_song.play()
        storyMode.setInteractive()
        arcadeMode.setInteractive()
        viewScoreBoard.setInteractive()
        //////////////////////////////////////////////////////////////////////////////////////////
        storyMode.on('pointerdown', (pointer) => {
            MainMenu_song.stop()
            this.scene.start('ComicPage1', token);
        });
        //////////////////////////////////////////////////////////////////////////////////////////
        arcadeMode.on('pointerdown', (pointer) => {
            MainMenu_song.stop()
            // this.goToArcadeMode()
            this.scene.start('ArcadeMode', token);
        })
        //////////////////////////////////////////////////////////////////////////////////////////
        viewScoreBoard.on('pointerdown', (pointer) => {
            MainMenu_song.stop()
            this.scene.start('scoreBoard', token);
        })

    }

    update(delta, time) {

    }

    async getTokenFromLineApi(code, nonce) {
        // console.log('get token')
        // console.log('nonce' + nonce)
        const objectResponse = await lineService.lineLogin(code, nonce, callbackGamePrUrl)
        if (objectResponse == null) {
            // console.log('check nonce failed')
            window.location.href = callbackGamePrUrl
        }
        let userNameFromLineApi = objectResponse.data.name
        let userObject
        let checkRes = await gamePrService.checkUserPr(objectResponse.data.userId)
        if (checkRes.data) {
            // console.log('exists')
            userObject = await gamePrService.getProfile(objectResponse.data.userId, userNameFromLineApi)
            const tokenObject = {
                scope: objectResponse.data.scope,
                access_token: objectResponse.data.access_token,
                token_type: objectResponse.data.token_type,
                expires_in: objectResponse.data.expires_in,
                id_token: objectResponse.data.id_token,
                userId: objectResponse.data.userId,
                userName: userObject.data.name,
                highScore: userObject.data.highScore
            }
            token = tokenObject
        } else {
            let newName
            let validingName = true
            let nameValidate = ""
            // console.log('non exists')
            if (!this.checkValidName(userNameFromLineApi)) {
                // console.log('name invalid')
                do {
                    validingName = true
                    alert('ชื่อผู้เล่นไม่สามารถใช้อักขระพิเศษหรือภาษาอื่นนอกจากไทยและอังกฤษได้และความยาวไม่เกิน15ตัวอักษร กรุณาตั้งชื่อใหม่')
                    newName = prompt("Please enter your name:", "your name");
                    validingName = !this.checkValidName(newName)
                }
                while (validingName || newName == null || newName == "" || newName.length > 15)
                userObject = await gamePrService.getProfile(objectResponse.data.userId, newName)
            } else {
                // console.log('name pass')
                nameValidate = userNameFromLineApi
                if (userNameFromLineApi.length > 15) {
                    do {
                        validingName = true
                        alert('ชื่อผู้เล่นไม่สามารถใช้อักขระพิเศษหรือภาษาอื่นนอกจากไทยและอังกฤษได้และความยาวไม่เกิน15ตัวอักษร กรุณาตั้งชื่อใหม่')
                        newName = prompt("Please enter your name:", "your name");
                        validingName = !this.checkValidName(newName)
                    }
                    while (validingName || newName == null || newName == "" || newName.length > 15)
                    nameValidate = newName
                }
                userObject = await gamePrService.getProfile(objectResponse.data.userId, nameValidate)
            }
            const tokenObject = {
                scope: objectResponse.data.scope,
                access_token: objectResponse.data.access_token,
                token_type: objectResponse.data.token_type,
                expires_in: objectResponse.data.expires_in,
                id_token: objectResponse.data.id_token,
                userId: objectResponse.data.userId,
                userName: newName==null?nameValidate:newName,
                highScore: userObject.data.highScore
            }
            token = tokenObject
        }
        // console.log(token)
    }

    checkValidName(name) {
        if (/[^\u0E00-\u0E7Fa-zA-Z0-9 ]|^'|'$|''/.test(name)) {
            return false
        } else {
            return true
        }
    }

} export default MainMenu
