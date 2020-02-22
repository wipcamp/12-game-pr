import {startScene} from '../utils/goTo'
import {preloadScene} from '../utils/preloadScene'

let comicPg1
let nextbtn
let comic_song
let token = {}
class ComicPage1 extends Phaser.Scene{

    constructor(){
        super({
            key: 'ComicPage1'
        })
    }

    init(data){
        // console.log(data)
        if(!data){
            window.location.href=`https://12-gamepr.freezer.wip.camp`
        }else{
            token = data
        }
    }

    preload(){
        this.load.image('comicPg1','../../images/Comic-Intro.jpg');
        this.load.image('nextbtn','../../images/Button_Play.png');
        this.load.audio('comic_song','../../songs/09. Reversal.mp3');
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
            this.goGameScene();
        })
    }
    goGameScene(){
        this.scene.start('GameScene',token);
    }
    update(delta, time){
         
    }

}
export default ComicPage1