import { preloadScene } from '../utils/preloadScene'
import { startScene } from '../utils/goTo'
let background
let gameName
let howToPlay
let storyMode
let arcadeMode
let MainMenu_song

class MainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainMenu'
        })
    }
    preload() {
        this.load.image('bg','../images/BG.png')
        this.load.image('gameName', '../images/GameName.png')
        this.load.image('howToPlay', '../images/Box_H2P.png')
        this.load.image('storyM', '../images/Button_Story.png')
        this.load.image('arcadeM', '../images/Button_Arcade.png')
        this.load.audio('MainMenu_song', '../songs/BG.mp3')
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        preloadScene({
            scene: this,
            key: 'default'
        })
    }
    create() {
        background = this.add.image(0, 0, 'bg').setOrigin(0, 0)
        gameName = this.add.image(300, 100, 'gameName')
        howToPlay = this.add.image(300, 420, 'howToPlay')
        storyMode = this.add.image(200, 730, 'storyM')
        arcadeMode = this.add.image(400, 730, 'arcadeM')
        MainMenu_song = this.sound.add('MainMenu_song',{volume: 0.15})
        MainMenu_song.play()
        storyMode.setInteractive()
        arcadeMode.setInteractive()
        //////////////////////////////////////////////////////////////////////////////////////////
        storyMode.on('pointerdown', (pointer) => {
            MainMenu_song.stop()
            this.scene.start('ComicPage1');
        });
        //////////////////////////////////////////////////////////////////////////////////////////
        arcadeMode.on('pointerdown', (pointer) => {
            MainMenu_song.stop()
            this.goToArcadeMode()
        })

    }

    goToArcadeMode(){
        startScene.call(this,'ArcadeMode')
    }
    
    update(delta, time) {

    }

} export default MainMenu
