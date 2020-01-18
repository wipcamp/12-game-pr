import {goToScene} from '../utils/goTo'
import {preloadScene} from '../utils/preloadScene'

let comicPg2
let nextbtn
let comic_song
class ComicPage2 extends Phaser.Scene{

    constructor(){
        super({
            key: 'ComicPage2'
        })
    }

    preload(){
        this.load.image('comicPg2','src/images/Comic-Intro2.jpg');
        this.load.image('nextbtn','src/images/nextButton.png');
        this.load.audio('comic_song','src/songs/09. Reversal.mp3');
        //////////////////////////////////////////////////////////////////////////////////////////////
        preloadScene({
            scene:this,
            key:'default'
        })
    }
    
    create(){
        comicPg2 = this.add.image(0, 0,'comicPg2').setOrigin(0,0).setScale(0.67)
        nextbtn = this.add.image(500, 760, 'nextbtn').setInteractive();
        comic_song = this.sound.add('comic_song',{volume: 0.15});
        comic_song.play();
 
        nextbtn.on('pointerdown', (pointer) =>{
            comic_song.stop();
            this.goGameScene();
        })
    }
    goGameScene(){
        goToScene.call(this, 'GameScene');
    }
    update(delta, time){
         
    }

}
export default ComicPage2