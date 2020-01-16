import EventEmitter from 'events';

const isWaveComplete = wave => wave.waveState.waveCompleteOn();

export default class EnemyWaveCore extends EventEmitter {
    constructor(props){
        super();
        this.waveHandlers = {
            nextWaveHandler: function(){
                const {waveCompleted} = this.waveState;
                if (waveCompleted){
                    console.log('%cHooray! wave completed! go next wave!', 'color: green');
                    // this.emit('waveEnd');
                    this.emit('nextWave', this.waveState);
                }
            }
        };
        this.waveState = {};
        this.waveEvents = {
            defaultWaveEvents: [
                {
                    eventName: 'waveStart',
                    eventCallback: function(props) {
                        props.waveSteps.call(this);
                    }
                },
                {
                    eventName: 'waveComplete',
                    eventCallback: function(args) {
                        //this.waveComplete(...args);
                        if (isWaveComplete(this)){
                            this.updateWaveState({
                                waveCompleted: true
                            });
                        }
                    },
                },
                {
                    eventName: 'waveEnd',
                    eventCallback: function(args=[]) {
                        // this.waveEnd(...args);
                        this.updateWaveState({
                            waveEnded: true
                        })
                    }
                },
                {
                    eventName: 'nextWave',
                    eventCallback: function(props) {
                        props.nextWave.call(this);
                    }
                }
            ]
        }
    }

    callHandlers(){
        Object.keys(this.waveHandlers).forEach(function(handler) {
            const func = this.waveHandlers[handler];
            func.call(this);
        }, this);
    }

    updateWaveState(props){
        this.waveState = Object.assign(this.waveState, props);
        this.callHandlers();
    }

    forceUpdateWaveState(){
        this.callHandlers();
    }

    registerWaveEvents(events){
        events.map(
            event => this.on(event.eventName, event.eventCallback)
        );
    }

    registerDefaultWaveEvents(){
        this.waveEvents.defaultWaveEvents.map(
            event => this.on(event.eventName, event.eventCallback)
        );
    }

    subscribe(handler){
        const {handlerName, callback} = handler;
        this.waveHandlers[handlerName] = callback;
    }

    unsubscribe(handlerName){
        delete this.waveHandlers[handlerName]
    }
}