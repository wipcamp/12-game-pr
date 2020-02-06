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
class GameOver extends Phaser.Scene{

    constructor(){
        super({
            key: 'GameOver'
        })
    }

    async init(data){
        if (!data) {
            window.location.href = `https://12-gamepr.freezer.wip.camp`
        } else {
            token = data.tokenMain
            score = data.newScore;
            await gamePrService.arcadeGameOver(token.userId,score)
            topPlayer = await gamePrService.getScoreBoard()
            waitScoreBoardData = true
            console.log('top player'+topPlayer)
        }
    }

    preload(){
        this.load.image('bg', 'src/images/BG.png')
        this.load.image('score','src/images/Box_OverScore.png')
        this.load.image('goMainMenu','src/images/Button_B2Menu.png')

        preloadScene({
            scene:this,
            key: 'default'
        })
    }

    create(){
        background = this.add.image(0, 0, 'bg').setOrigin(0, 0)
        button_back = this.add.image(300, 750, 'goMainMenu').setInteractive();
        overScore = this.add.image(300, 360, 'score')
        scoreText = this.add.text(280, 150, this.score, { fontSize: '30px', fill: '#000000' });

        
        

        button_back.on('pointerdown', (pointer) =>{
            this.scene.start('MainMenu',token);
        });

    }

    createScoreBoardData(){
        this.add.text(110, 250, topPlayer[0].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(110, 290, topPlayer[1].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(110, 330, topPlayer[2].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(110, 370, topPlayer[3].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(110, 410, topPlayer[4].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(110, 450, topPlayer[5].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(110, 490, topPlayer[6].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(110, 530, topPlayer[7].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(110, 570, topPlayer[8].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(110, 610, topPlayer[9].name, { fontSize: '30px', fill: '#000000' });

        this.add.text(380, 250, topPlayer[0].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(380, 290, topPlayer[1].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(380, 330, topPlayer[2].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(380, 370, topPlayer[3].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(380, 410, topPlayer[4].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(380, 450, topPlayer[5].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(380, 490, topPlayer[6].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(380, 530, topPlayer[7].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(380, 570, topPlayer[8].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(380, 610, topPlayer[9].highScore, { fontSize: '30px', fill: '#000000' });
    }

    goToMainMenu(){
        this.scene.start('MainMenu',token);
    }

    update(delta,time){
        if(waitScoreBoardData){
            this.createScoreBoardData().bind(this)
        }
    }
}

export default GameOver