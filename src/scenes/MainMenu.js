let background
let gameName
let howToPlay
let storyMode
let arcadeMode

class MainMenu extends Phaser.Scene{

    constructor(){
        super({
            key: 'MainMenu'
        })
    }

    preload(){
        // this.load.image('bg','../images/BG.jpg')
        // this.load.image('gameName','../images/GameName.png')
        // this.load.image('howToPlay','../images/HowToPlay.png')
        // this.load.image('storyM','../images/StoryMode.png')
        // this.load.image('arcadeM','../images/ArcadeMode.png')
        
    }
    
    create(){
        // background = this.add.tileSpite(0, 0, 600, 800,'bg')
        // gameName = this.add.image(0, 0, 'gameName')
        // howToPlay = this.add.image(0, 0,'howToPlay')
        // storyMode = this.add.image(0, 0, 'storyM')
        // arcadeMode = this.add.image(0, 0,'arcadeM')
    }

    update(delta, time){
        //  background.tilePositionY-=1
    }

}
export default MainMenu