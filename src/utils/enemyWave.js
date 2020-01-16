import EnemyWaveCore from './enemyWaveCore';

const isWaveComplete = wave => wave.waveCompleteOn();

export default class EnemyWave extends EnemyWaveCore {
    constructor(props){
        super(props);
        const {
            waveName,
            waveSteps,
            waveCompleteOn,
            waveCompleted,
            waveFailed,
            waveDelay,
        } = props
        // this.waveState = waveState;
        this.waveName = waveName;
        this.waveNo = ++EnemyWave.waveCount;
        this.waveSteps = waveSteps;
        this.waveCompleteOn = waveCompleteOn;
        this.waveCompleted = waveCompleted;
        this.waveFailed = waveFailed;
        this.waveStatus = false;
        this.waveDelay = waveDelay ? null : 100;

        this.registerDefaultWaveEvents();
    }
    
    async start(){
        //setInterval(this.emit, 500,);
        setTimeout(await this.waveSteps, this.waveDelay);

        return true;
    }

    async complete(){
        //await this.waveComplete();
        this.emit('waveComplete');
        return true;
    }

    fail(){
        this.waveFailed();
    }

    
}