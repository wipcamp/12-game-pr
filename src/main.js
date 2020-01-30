import 'phaser';
import GameScene from './scenes/GameScene';
import ComicPage1 from './scenes/ComicPage1';
import ComicPage2 from './scenes/ComicPage2';
import ComicPageEnd from './scenes/ComicPageEnd';
import MainMenu from './scenes/MainMenu';
import ArcadeMode from './scenes/ArcadeMode';

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
            debug: false,
            gravity: {y:0}
        }
    },
    scene: [
        MainMenu,ArcadeMode,ComicPage1,GameScene,ComicPageEnd
    ]
};

const game = new Phaser.Game(config);
export default game;