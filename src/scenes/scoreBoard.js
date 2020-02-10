import { preloadScene } from '../utils/preloadScene'
let token = {}
let background
let button_back
let ScoreBoard
class scoreBoard extends Phaser.Scene{

    constructor(){
        super({
            key: 'scoreBoard'
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
        button_back.setInteractive();
        
        button_back.on('pointerdown', (pointer) =>{
            this.scene.start('MainMenu',token);
        })
    }

   

    update(delta,time){

    }
}

export default scoreBoard