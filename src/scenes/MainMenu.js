import {goToScene} from '../utils/goTo'

let background
let gameName
let howToPlay
let storyMode
let arcadeMode

class MainMenu extends Phaser.Scene {

    constructor() {
        super({
            key: 'MainMenu'
        })
    }

    preload() {
        this.load.image('bg', 'src/images/BG.jpg')
        this.load.image('gameName', 'src/images/GameName.png')
        this.load.image('howToPlay', 'src/images/HowToPlay.png')
        this.load.image('storyM', 'src/images/StoryMode.png')
        this.load.image('arcadeM', 'src/images/ArcadeMode.png')

    }

    create() {
        background = this.add.image(0, 0, 'bg').setOrigin(0, 0).setSize(600, 800).setScale(0.6)
        gameName = this.add.image(250, 150, 'gameName').setScale(0.6)
        howToPlay = this.add.image(350, 450, 'howToPlay').setScale(0.2)
        storyMode = this.add.image(300, 700, 'storyM').setScale(0.5)
        arcadeMode = this.add.image(500, 700, 'arcadeM').setScale(0.5)

        storyMode.setInteractive()
        storyMode.on('pointerdown', (pointer) => {
            this.goStoryWave1()
        });
    
    }

    goStoryWave1() {
        goToScene.call(this, 'GameScene')
    }


    update(delta, time) {

    }

}
export default MainMenu