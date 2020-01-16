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
            waveCompleteStatus,
            waveFailed,
            waveEnded,
            waveEndStatus,
            waveDelay,
            nextWave,
        } = props;
        // this.waveState = waveState;
        this.updateWaveState({
            waveName,
            waveNo,
            waveScene,
            waveSteps: waveSteps ? waveSteps : function(){this.forceUpdateWaveState()},
            waveCompleteOn: waveCompleteOn ? waveCompleteOn : function(){return true},
            waveFailOn: waveFailOn ? waveFailOn : function(){return false},
            waveCompleted: waveCompleted ? waveCompleted : function(){},
            waveCompleteStatus: waveCompleteStatus ? waveCompleteStatus : false,
            waveEnded: waveEnded ? waveEnded : function(){},
            waveEndStatus: waveEndStatus ? waveEndStatus : false,
            waveDelay: waveDelay ? waveDelay : 500,
            nextWave: nextWave ? nextWave : function(){}
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
        const {waveDelay} = this.waveState;
        setTimeout(() => this.emit('waveStart', this.waveState), waveDelay);
    }

    complete(){
        // Implements force complete here.
    }

    fail(){
        // Implements force fail here.
    }

}

