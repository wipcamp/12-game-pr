import { preloadScene } from '../utils/preloadScene'
let token = {}
let highScore
let background
let button_back
let ScoreBoard
import gamePrService from '../services/GamePrService'
import game from '../main'
let topPlayer = []
let waitScoreBoardData = false
const namePosition = [{ x: 110, y: 250 }, { x: 110, y: 290 }, { x: 110, y: 330 }, { x: 110, y: 370 }, { x: 110, y: 410 }, { x: 110, y: 450 }, { x: 110, y: 490 }, { x: 110, y: 530 }, { x: 110, y: 570 }, { x: 110, y: 610 }]
const scorePosition = [{ x: 380, y: 250 }, { x: 380, y: 290 }, { x: 380, y: 330 }, { x: 380, y: 370 }, { x: 380, y: 410 }, { x: 380, y: 450 }, { x: 380, y: 490 }, { x: 380, y: 530 }, { x: 380, y: 570 }, { x: 380, y: 610 }]

class scoreBoard extends Phaser.Scene{

    constructor(){
        super({
            key: 'scoreBoard'
        })
    } 

    async init(data){
        if (!data) {
            window.location.href = `https://12-gamepr.freezer.wip.camp`
        } else {
            token = data
            let resHighScore = await gamePrService.getHighScore(token.userId)
            highScore = resHighScore.data
            let res = await gamePrService.getScoreBoard()
            topPlayer = res.data
            waitScoreBoardData = true
        }
    }

    preload(){
        this.load.image('bg', './images/BG.png')
        //this.load.image('gameOver','./images/Box_Over.png')
        this.load.image('ScoreBoard','./images/Box_ScoreBoard.png')
        this.load.image('goMainMenu','./images/Button_B2Menu.png')

        preloadScene({
            scene:this,
            key: 'default'
        })
    }

    create(){
        background = this.add.image(0, 0, 'bg').setOrigin(0, 0)
        button_back = this.add.image(300, 750, 'goMainMenu')
        ScoreBoard = this.add.image(300, 360, 'ScoreBoard')

        

        button_back.setInteractive();
        
        button_back.on('pointerdown', (pointer) =>{
            this.scene.start('MainMenu',token);
        })
    }

    createHighScorePlayer(){
        this.add.text(250, 185, highScore, { fontSize: '30px', fill: '#000000' });
    }

    createScoreBoardData() {
        topPlayer.forEach((element, index) => {
            let name = this.add.text(namePosition[index].x, namePosition[index].y, element.name, { fontSize: '30px', fill: '#000000' });
            let highScore = this.add.text(scorePosition[index].x, scorePosition[index].y, element.highScore, { fontSize: '30px', fill: '#000000' });
            if (token.userId == element.id) {
                name.setColor('#da0707')
                highScore.setColor('#da0707')
            }
        })
    }
   

    update(delta,time){
        if (waitScoreBoardData) {
            this.createHighScorePlayer()
            this.createScoreBoardData()
            waitScoreBoardData = false
        }
    }
}

export default scoreBoard