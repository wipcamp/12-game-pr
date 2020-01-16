import EventEmitter from 'events';

export default class EnemyWaveCore extends EventEmitter {
    constructor(props){
        super();
        this.waveState = {};
        this.waveEvents = {
            defaultWaveEvents: [
                {
                    eventName: 'waveComplete',
                    eventCallback: function(args) {
                        //this.waveComplete(...args);
                        this.updateWaveState({
                            waveCompleted: true
                        });
                    },
                },
                {
                    eventName: 'waveEnd',
                    eventCallback: function(args) {
                        this.waveEnd(...args);
                        this.updateWaveState({
                            waveEnded: true
                        })
                    }
                },
                {
                    eventName: 'checkWaveCompleted',
                    eventCallback: function(args) {
                        const {waveCompleted} = this.waveState;
                        if (waveCompleted){
                            console.log('%cHooray! wave completed!', 'color: green');
                        }
                    }
                }
            ]
        }
    }

    async start(){
        throw new Error("Unsupported operation")
        return false;
    }

    async complete(){
        throw new Error("Unsupported operation")
        return false;
    }

    updateWaveState(props){
        this.waveState = Object.assign(this.waveState, props);
        this.emit('checkWaveCompleted');
    }

    forceUpdateWaveState(){
        this.emit('checkWaveCompleted')
    }

    async registerWaveEvents(events){
        events.map(
            event => this.on(event.eventName, event.eventCallback)
        );
    }

    async registerDefaultWaveEvents(){
        this.waveEvents.defaultWaveEvents.map(
            event => this.on(event.eventName, event.eventCallback)
        );
    }
}