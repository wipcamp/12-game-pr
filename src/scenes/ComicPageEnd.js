import {goToScene} from '../utils/goTo'
import {preloadScene} from '../utils/preloadScene'

let comic_song
let comicPgEnd
let nextbtn

class ComicPageEnd extends Phaser.Scene{

    constructor(){
        super({
            key: 'ComicPageEnd'
        })
    }

    preload(){
        this.load.image('comicPgEnd','src/images/Comic-Ending.jpg');
        this.load.image('nextbtn','src/images/Button_B2Menu.png');
        this.load.audio('comic_song','src/songs/BG.mp3');
        //////////////////////////////////////////////////////////////////////////////////////////////
        preloadScene({
            scene:this,
            key:'default'
        })
    }
    
    create(){
        comicPgEnd = this.add.image(0, 0,'comicPgEnd').setOrigin(0,0).setScale(0.67);
        nextbtn = this.add.image(500, 760, 'nextbtn').setInteractive();
        comic_song = this.sound.add('comic_song',{volume: 0.15});
        comic_song.play();
        nextbtn.on('pointerdown', (pointer) =>{
            comic_song.stop();
            this.goMainMenu()
        })
    }
    goMainMenu(){
        goToScene.call(this, 'MainMenu')
    }
    update(delta, time){
         
    }

}
export default ComicPageEnd