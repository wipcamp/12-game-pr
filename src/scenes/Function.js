class Function extends Phaser.Scene {

    constructor(){
        super({
            key: 'Function'
        })
    }

    preload(){
        this.load.image('bullet' , 

        
        '~/src/image/picture.png')


    }

    create(){

    }


    update(delta, time){
        for(let i = 0;i < monsters.getLength();i++){
            let mons = monsters.getChildren()[i]
            if(mons.y > this.game.config.height + 100){
                mons.destroy(true)
                score -= 50
                scoreText.setText('Score: ' + score)
            }
        }
    }

}
export default Function