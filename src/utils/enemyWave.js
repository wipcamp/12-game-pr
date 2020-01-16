import EnemyWaveCore from './enemyWaveCore';

// const isWaveComplete = wave => wave.waveCompleteOn();

export default class EnemyWave extends EnemyWaveCore {
    constructor(props){
        super(props);
        const {
            waveName,
            waveNo,
            waveScene,
            waveSteps,
            waveCompleteOn,
            waveFailOn,
            waveCompleted,
            // waveCompleteStatus,
            // waveFailed,
            waveDelay,
            nextWave,
        } = props;
        // this.waveState = waveState;
        this.updateWaveState({
            waveName,
            waveNo,
            waveScene,
            waveSteps,
            waveCompleteOn,
            waveFailOn,
            waveCompleted,
            waveCompleteStatus: false,
            waveDelay: waveDelay ? waveDelay : 500,
            nextWave
        });
        // this.waveName = waveName;
        // this.waveNo = ++EnemyWave.waveCount;
        // this.waveSteps = waveSteps;
        // this.waveCompleteOn = waveCompleteOn;
        // this.waveCompleted = waveCompleted;
        // this.waveFailed = waveFailed;
        // this.waveStatus = false;
        // this.waveDelay = waveDelay ? null : 100;

        this.registerDefaultWaveEvents();
    }
    
    start(){
        //setInterval(this.emit, 500,);
        // setTimeout(await this.waveSteps, this.waveDelay);
        const {waveDelay} = this.waveState;
        setTimeout(() => this.emit('waveStart', this.waveState), waveDelay);
        // this.emit('waveStart', this.waveState);
        // return true;
    }

    complete(){
        //await this.waveComplete();
        this.emit('waveComplete');
        return true;
    }

    fail(){
        this.waveFailed();
    }

}

