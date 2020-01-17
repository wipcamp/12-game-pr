function createContainer(type) {
    const containerType = {
        object: () => {},
        array: () => [],
    }
    return containerType[type]();
}

export default class EnemyWaveContainer {
    constructor(props){
        const {containerType} = props;
        this.containerType = containerType;
        this.container = createContainer(containerType);
    }  

    get containerType(){
        return this.containerType;
    }

    set containerType(containerType){
        this.containerType = containerType;
    }

    addEnemyWave(wave){
        const containerType = {
            object: wave => this.container[wave.waveState.waveNo-1],
            array: wave => this.container.push(wave),
        }
        containerType[this.containerType](wave);
    }

    addEnemyWaves(waves){
        const containerType = {
            object: waves => {throw new Error('addEnemyWaves to object container not supported!')},
            array: waves => this.container = this.container.concat(waves),
        }
        containerType[this.containerType](waves);
    }

    makeSequential(){
        const containerType = {
            object: () => {throw new Error('object container does not supported makeSequentialEnemyWave yet!')},
            array: () => this.container.map((enemyWave, index) => {
                if (index !== this.container.length-1){
                    enemyWave.updateWaveState({waveNext: this.container[index+1]})
                }
            })
        };
        containerType[this.containerType]();
    }

    run(){
        this.container[0].start();
    }

    runAt(waveIndex){
        if(waveIndex >= 0 && waveIndex < this.container.length){
            this.container[waveIndex].start();
        }
    }
}