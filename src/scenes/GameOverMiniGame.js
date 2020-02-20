import { preloadScene } from '../utils/preloadScene'

let background
let gameOver
let back2Menu
let userData
class GameOverMiniGame extends Phaser.Scene{

    constructor(){
        super({
            key: 'GameOverMiniGame'
        })
    }

    init(data){
        if (!data) {
            window.location.href = `https://gamepr.wip.camp`
        } else {
            userData = data
        }
    }

    preload(){
        this.load.image('bg', 'src/images/BackGround.png')
        this.load.image('over', 'src/images/Box_Over.png')
        this.load.image('goMainMenu', 'src/images/Button_B2Menu.png')
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
            this.gameOver()
        });

    }
    
    update(delta, time){
         
    }

    gameOver() {
        const timePlayed = new Date()
        window.location.href = `https://12-gamecamp.freezer.wip.camp/?verifyCode=${userData.userData.verifyCode}&timeStart=${userData.userData.timeStart}&score=${userData.score}&timePlay=${timePlayed.getTime()}`
    }

}
export default GameOverMiniGame