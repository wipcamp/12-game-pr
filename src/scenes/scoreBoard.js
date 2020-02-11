import { preloadScene } from '../utils/preloadScene'
let token = {}
let background
let button_back
let ScoreBoard
import gamePrService from '../services/GamePrService'
let topPlayer = []
let waitScoreBoardData = false

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
            let res = await gamePrService.getScoreBoard()
            topPlayer = res.data
            waitScoreBoardData = true
        }
    }

    preload(){
        this.load.image('bg', 'src/images/BG.png')
        //this.load.image('gameOver','src/images/Box_Over.png')
        this.load.image('ScoreBoard','src/images/Box_ScoreBoard.png')
        this.load.image('goMainMenu','src/images/Button_B2Menu.png')

        preloadScene({
            scene:this,
            key: 'default'
        })
    }

    create(){
        background = this.add.image(0, 0, 'bg').setOrigin(0, 0)
        button_back = this.add.image(300, 750, 'goMainMenu')
        ScoreBoard = this.add.image(300, 360, 'ScoreBoard')

        this.add.text(280, 150, token.highScore, { fontSize: '30px', fill: '#000000' });

        button_back.setInteractive();
        
        button_back.on('pointerdown', (pointer) =>{
            this.scene.start('MainMenu',token);
        })
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
            this.createScoreBoardData()
            waitScoreBoardData = false
        }
    }
}

export default scoreBoard