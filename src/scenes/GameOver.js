import { startScene } from '../utils/goTo'
import { preloadScene } from '../utils/preloadScene'
import gamePrService from '../services/GamePrService'
let background
let gameOver
let overScore
let button_back

let score
let scoreText
const token = {}
const topPlayer = []
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

        this.add.text(150, 200, topPlayer[0].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(150, 300, topPlayer[1].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(150, 350, topPlayer[2].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(150, 250, topPlayer[3].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(150, 400, topPlayer[4].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(150, 450, topPlayer[5].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(150, 500, topPlayer[6].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(150, 550, topPlayer[7].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(150, 600, topPlayer[8].name, { fontSize: '30px', fill: '#000000' });
        this.add.text(150, 650, topPlayer[9].name, { fontSize: '30px', fill: '#000000' });

        this.add.text(450, 200, topPlayer[0].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(450, 300, topPlayer[1].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(450, 350, topPlayer[2].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(450, 250, topPlayer[3].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(450, 400, topPlayer[4].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(450, 450, topPlayer[5].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(450, 500, topPlayer[6].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(450, 550, topPlayer[7].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(450, 600, topPlayer[8].highScore, { fontSize: '30px', fill: '#000000' });
        this.add.text(450, 650, topPlayer[9].highScore, { fontSize: '30px', fill: '#000000' });
        

        button_back.on('pointerdown', (pointer) =>{
            this.goToMainMenu();
        });

    }

    goToMainMenu(){
        startScene.call(this,'MainMenu',token);
    }

    update(delta,time){
        
    }
}

export default GameOver