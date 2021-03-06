import { startScene } from '../utils/goTo'
import { preloadScene } from '../utils/preloadScene'
import gamePrService from '../services/GamePrService'
import axios from 'axios';
let background
let gameOver
let overScore
let button_back

let score
let scoreText
let token = {}
let topPlayer = []
let waitScoreBoardData = false
const namePosition = [{ x: 110, y: 250 }, { x: 110, y: 290 }, { x: 110, y: 330 }, { x: 110, y: 370 }, { x: 110, y: 410 }, { x: 110, y: 450 }, { x: 110, y: 490 }, { x: 110, y: 530 }, { x: 110, y: 570 }, { x: 110, y: 610 }]
const scorePosition = [{ x: 380, y: 250 }, { x: 380, y: 290 }, { x: 380, y: 330 }, { x: 380, y: 370 }, { x: 380, y: 410 }, { x: 380, y: 450 }, { x: 380, y: 490 }, { x: 380, y: 530 }, { x: 380, y: 570 }, { x: 380, y: 610 }]
class GameOver extends Phaser.Scene {

    constructor() {
        super({
            key: 'GameOver'
        })
    }

    async init(data) {
        if (!data) {
            window.location.href = `https://gamepr.wip.camp`
        } else {
            token = data.tokenMain
            score = data.newScore;
            await gamePrService.arcadeGameOver(token.userId, score)
            let res = await gamePrService.getScoreBoard()
            topPlayer = res.data
            waitScoreBoardData = true
        }
    }

    preload() {
        this.load.image('bg', '../../images/BG.png')
        this.load.image('score', '../../images/Box_OverScore.png')
        this.load.image('goMainMenu', '../../images/Button_B2Menu.png')

        preloadScene({
            scene: this,
            key: 'default'
        })
    }

    create() {
        background = this.add.image(0, 0, 'bg').setOrigin(0, 0)
        button_back = this.add.image(300, 750, 'goMainMenu').setInteractive();
        overScore = this.add.image(300, 360, 'score')
        scoreText = this.add.text(280, 150, score, { fontSize: '30px', fill: '#000000' });




        button_back.on('pointerdown', (pointer) => {
            this.scene.start('MainMenu', token);
        });

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


    goToMainMenu() {
        this.scene.start('MainMenu', token);
    }

    update(delta, time) {
        if (waitScoreBoardData) {
            this.createScoreBoardData()
            waitScoreBoardData = false
        }
    }
}

export default GameOver