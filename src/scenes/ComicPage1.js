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
        this.load.image('comicPg1','../images/Comic-Intro.jpg');
        this.load.image('nextbtn','../images/nextButton.png');
        this.load.audio('comic_song','../songs/09. Reversal.mp3');
        //////////////////////////////////////////////////////////////////////////////////////////////
        preloadScene({
            scene:this,
            key:'default'
        })
    }
    
    create(){
        comicPg1 = this.add.image(0, 0,'comicPg1').setOrigin(0,0);
        nextbtn = this.add.image(500, 760, 'nextbtn').setInteractive();
        comic_song = this.sound.add('comic_song',{volume: 0.15});
        comic_song.play();
        //////////////////////////////////////////////////////////////////////////////////////////
        nextbtn.on('pointerdown', (pointer) =>{
            comic_song.stop();
            this.goComicPage2();
        })
    }
    goComicPage2(){
        goToScene.call(this, 'ComicPage2');
    }
    update(delta, time){
         
    }

}
export default ComicPage1