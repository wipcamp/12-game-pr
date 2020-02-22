import {startScene} from '../utils/goTo';

class Preload extends Phaser.Scene {
    constructor() {
        super({
            key: 'Preload'
        })
    }
    preload() {
        this.load.image('BgPre', './images/BackGround.png');
    }

    update() {
        startScene.call(this, 'MainMenu');
    }

} export default Preload
