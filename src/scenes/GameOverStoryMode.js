import { preloadScene } from '../utils/preloadScene'

let token = {}
let background
let gameOver
let back2Menu
class GameOverStoryMode extends Phaser.Scene{

    constructor(){
        super({
            key: 'GameOverStoryMode'
        })
    }

    init(data){
        if (!data) {
            window.location.href = `https://12-gamepr.freezer.wip.camp`
        } else {
            token = data
        }
    }

    preload(){
        this.load.image('bg', './images/BackGround.png')
        this.load.image('over', './images/Box_Over.png')
        this.load.image('goMainMenu', './images/Button_B2Menu.png')
        //////////////////////////////////////////////////////////////////////////////////////////////
        preloadScene({
            scene:this,
            key:'default'
        })
    }
    
    create(){
        background = this.add.image(0, 0, 'bg').setOrigin(0, 0)
        gameOver = this.add.image(300, 350, 'over')
        back2Menu = this.add.image(300, 490, 'goMainMenu').setInteractive()
        
        back2Menu.on('pointerdown', (pointer) => {
            this.scene.start('MainMenu', token);
        });

    }
    
    update(delta, time){
         
    }

}
export default GameOverStoryMode 