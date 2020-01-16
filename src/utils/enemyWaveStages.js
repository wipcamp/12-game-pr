import Enemy from "../scenes/core/Enemy";

function firstEnemyWaveSteps(props){
    let {
        waves,
        player,
        bulletGroup,
        enemyKey,
        healthPlayer,
        heart3,
        heart2,
        heart1
    } = props;
    console.log('wave '+waves[0].waveState.waveNo
        +waves[0].waveState.waveName+' start');
    let waveEnemy = new Enemy(waves[0].waveState.waveScene, 0, -1000, enemyKey);
    let waveEnemyGroup = waveEnemy.spawnEnemyWave(enemyKey, player);
    const {waveScene} = this.waveState;
    this.updateWaveState({
        enemyKillCount: 0
    });
    function touchingWaveEnemy(player, waveEnemyGroup) {
        this.updateWaveState({
            enemyKillCount: this.enemyKillCount+1
        });
        waveEnemyGroup.disableBody(true, true);
        waveEnemyGroup.destroy();
        healthPlayer = healthPlayer - 1;
        if (healthPlayer === 2) {
            heart3.setVisible(false);
        }
        else if (healthPlayer === 1) {
            heart2.setVisible(false);
        }
        else if (healthPlayer === 0) {
            heart1.setVisible(false);
        }
    }
    waveScene.physics.add.overlap(player, waveEnemyGroup, touchingWaveEnemy.bind(waves[0]), null, this);
    function HitWaveEnemy(bulletGroup, waveEnemyGroup) {
        this.updateWaveState({
            enemyKillCount: this.waveState.enemyKillCount+1
        });
        waveEnemyGroup.disableBody(true, true);
        waveEnemyGroup.destroy();
        bulletGroup.disableBody(true, true);
        bulletGroup.destroy();
    }
    waveScene.physics.add.overlap(bulletGroup, waveEnemyGroup, HitWaveEnemy.bind(waves[0]), null, this)
}