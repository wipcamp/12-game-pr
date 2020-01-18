import 'phaser';
import GameScene from './scenes/GameScene';
import ComicPage1 from './scenes/ComicPage1';
import ComicPage2 from './scenes/ComicPage2';
import ComicPageEnd from './scenes/ComicPageEnd';
import MainMenu from './scenes/MainMenu';

const config = {
    
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 600,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y:0}
        }
    },
    scene: [
        MainMenu,ComicPage1,ComicPage2,GameScene,ComicPageEnd
    ]
};

const game = new Phaser.Game(config);
export default game;