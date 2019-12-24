import 'phaser';
import GameScene from './scenes/GameScene';

const config = {
    
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 600,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y:0}
        }
    },
    scene: [
        GameScene,
    ]
};

const game = new Phaser.Game(config);