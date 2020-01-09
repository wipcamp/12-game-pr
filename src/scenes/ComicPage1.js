import {goToScene} from '../utils/goTo'
import {preloadScene} from '../utils/preloadScene'

let comicPg1
let nextbtn
let comic_song
class ComicPage1 extends Phaser.Scene{

    constructor(){
        super({
            key: 'ComicPage1'
        })
    }

    preload(){
        this.load.image('comicPg1','src/images/comicP1.png')
        this.load.image('nextbtn','src/images/nextButton.png')
        this.load.audio('comic_song','src/songs/Heartbeats - Broove (LuviKunG Remix).mp3')
        //////////////////////////////////////////////////////////////////////////////////////////////
        preloadScene({
            scene:this,
            key:'default'
        })
    }
    
    create(){
        comicPg1 = this.add.image(0, 0,'comicPg1').setScale(0.7).setOrigin(0,0)
        nextbtn = this.add.image(550, 750, 'nextbtn').setScale(0.2).setInteractive()
        comic_song = this.sound.add('comic_song')
        comic_song.play()
 
        nextbtn.on('pointerdown', (pointer) =>{
            comic_song.stop()
            this.goMainMenu()
        })
    }

    goMainMenu(){
        goToScene.call(this, 'GameScene')
    }

    update(delta, time){
         
    }

}
export default ComicPage1