import {goToScene} from '../utils/goTo'
import game from '../main'

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
        this.load.image('comicPg1','src/images/comicP1.jpg')
        this.load.image('nextbtn','src/images/nextButton.png')
        this.load.audio('comic_song','src/songs/BG.mp3')
    }
    
    create(){
        comicPg1 = this.add.image(0, 0,'comicPg1').setOrigin(0,0)
        nextbtn = this.add.image(500, 760, 'nextbtn').setInteractive()
        comic_song = this.sound.add('comic_song')
        comic_song.play()
 
        nextbtn.on('pointerdown', (pointer) =>{
            comic_song.stop()
            this.scene.start('GameScene');
        })
    }

    update(delta, time){
         
    }

}
export default ComicPage1