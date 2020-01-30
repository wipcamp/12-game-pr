import { startScene } from '../utils/goTo'
import { preloadScene } from '../utils/preloadScene'
let background
let gameOver
let overScore
let button_back

class GameOver extends Phaser.Scene{

    constructor(){
        super({
            key: 'GameOver'
        })
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
        
        button_back.on('pointerdown', (pointer) =>{
            this.goToMainMenu();
        })
    }

    goToMainMenu(){
        startScene.call(this,'MainMenu');
    }

    update(delta,time){

    }
}

export default GameOver