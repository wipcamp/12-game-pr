import { startScene } from '../utils/goTo'
import { preloadScene } from '../utils/preloadScene'

let comic_song
let comicPgEnd
let back2menu
let token = {}
class ComicPageEnd extends Phaser.Scene{

    constructor(){
        super({
            key: 'ComicPageEnd'
        })
    }

    init(data){
        if (!data) {
            window.location.href = `https://gamepr.wip.camp`
        } else {
            token = data
        }
    }

    preload(){
        this.load.image('comicPgEnd','../../images/Comic-Ending-Pr.jpg');
        this.load.image('back2Menubtn','../../images/Button_B2Menu.png');
        this.load.audio('comic_song','../../songs/BG.mp3');
        //////////////////////////////////////////////////////////////////////////////////////////////
        preloadScene({
            scene:this,
            key:'default'
        })
    }
    
    create(){
        comicPgEnd = this.add.image(0, 0,'comicPgEnd').setOrigin(0,0).setScale(0.67);
        back2menu = this.add.image(500, 760, 'back2Menubtn').setInteractive();
        comic_song = this.sound.add('comic_song',{volume: 0.15});
        comic_song.play();
        back2menu.on('pointerdown', (pointer) =>{
            comic_song.stop();
            this.scene.start('MainMenu',token)
        })
    }
    goMainMenu(){
        this.scene.start('MainMenu',token)
    }
    update(delta, time){
         
    }

}
export default ComicPageEnd