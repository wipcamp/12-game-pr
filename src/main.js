import 'phaser';
import GameScene from './scenes/GameScene';
import ComicPage1 from './scenes/ComicPage1';
import ComicPageEnd from './scenes/ComicPageEnd';
import MainMenu from './scenes/MainMenu';
import ArcadeMode from './scenes/ArcadeMode';
import GameOver from './scenes/GameOver';
import scoreBoard from './scenes/scoreBoard';
import ResponsiveGame from './scenes/core/ResponsiveGame';

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
        MainMenu, ComicPage1, GameScene, ComicPageEnd,ArcadeMode, GameOver, scoreBoard
    ]
};

const game = new ResponsiveGame(config);

export default game;