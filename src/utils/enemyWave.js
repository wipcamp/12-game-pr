import EnemyWaveCore from './enemyWaveCore';

// const isWaveComplete = wave => wave.waveCompleteOn();

export default class EnemyWave extends EnemyWaveCore {
    constructor(props){
        super(props);
        const {
            waveName,
            waveNo,
            waveSteps,
            waveCompleteOn,
            waveFailOn,
            waveCompleted,
            // waveFailed,
            waveDelay,
            nextWave,
        } = props
        // this.waveState = waveState;
        this.updateWaveState({
            waveName,
            waveNo,
            waveSteps,
            waveCompleteOn,
            waveFailOn,
            waveCompleted,
            waveDelay,
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
        // setTimeout(this.emit('waveStart', this.waveState), this.waveDelay);
        this.emit('waveStart', this.waveState);
        return true;
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