import EventEmitter from 'events';

const isWaveComplete = wave => wave.waveState.waveCompleteOn();

export default class EnemyWaveCore extends EventEmitter {
    constructor(props){
        super();
        this.waveHandlers = {
            waveCompleteHandler: function(){
                const {waveCompleteStatus} = this.waveState;
                if (!waveCompleteStatus) {
                    if (isWaveComplete(this)) {
                        this.emit('waveComplete');
                    }
                }
            }, waveEndHandler: function(){
                const {waveCompleteStatus, waveEndStatus} = this.waveState;
                if (!waveEndStatus) {
                    if (waveCompleteStatus) {
                        this.emit('waveEnd');
                    }
                }
            }, nextWaveHandler: function(){
                const {waveCompleteStatus, waveEnded} = this.waveState;
                if (waveCompleteStatus && waveEnded){
                    this.emit('nextWave', this.waveState);
                    this.removeAllListeners();
                }
            },
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
                    eventCallback: function() {
                        this.updateWaveState({
                            waveCompleteStatus: true
                        });
                        this.waveState.waveCompleted();
                    },
                },
                {
                    eventName: 'waveEnd',
                    eventCallback: function() {
                        this.updateWaveState({
                            waveEndStatus: true
                        });
                        this.waveState.waveEnded();
                    }
                },
                {
                    eventName: 'nextWave',
                    eventCallback: function(props) {
                        const {waveNext} = props;
                        props.nextWave.call(this, waveNext);
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