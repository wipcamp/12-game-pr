export default class ResponsiveGame extends Phaser.Game {
    constructor(config){
        super(config);
        window.addEventListener('resize', () => this.__resize__(this));
        window.addEventListener('DOMContentLoaded', () => this.__resize__(this));
    }

    __resize__(game){
        let canvas = document.querySelector("#content > canvas:first-child");
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let windowRatio = windowWidth / windowHeight;
        let gameRatio = game.config.width / game.config.height;

        if(windowRatio < gameRatio){
            canvas.style.width = windowWidth + "px";
            canvas.style.height = (windowWidth / gameRatio) + "px";
        }
        else {
            canvas.style.width = (windowHeight * gameRatio) + "px";
            canvas.style.height = windowHeight + "px";
        }
    }
    
}