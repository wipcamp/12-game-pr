import Enemy from "../scenes/core/Enemy";

function firstEnemyWaveSteps(){
    let waveEnemy = new Enemy(waves[0].waveState.waveScene, 0, -1000, enemyKey);
    let waveEnemyGroup = waveEnemy.spawnEnemyWave(enemyKey, player);
    const {waveScene} = this.waveState;
    function touchingWaveEnemy(player, waveEnemyGroup) {
        this.enemyKillCount++;
        waveEnemyGroup.disableBody(true, true);
        waveEnemyGroup.destroy();
        healthPlayer = healthPlayer - 1;
        if (healthPlayer == 2) {
            heart3.setVisible(false);
        }
        else if (healthPlayer == 1) {
            heart2.setVisible(false);
        }
        else if (healthPlayer == 0) {
            heart1.setVisible(false);
        }
    }
    waveScene.physics.add.overlap(player, waveEnemyGroup, touchingWaveEnemy, null, this)
    function HitWaveEnemy(bulletGroup, waveEnemyGroup) {
        console.log('HITSHIT');
        waveEnemyGroup.disableBody(true, true);
        waveEnemyGroup.destroy();
        bulletGroup.disableBody(true, true);
        bulletGroup.destroy();
    }
    waveScene.physics.add.overlap(bulletGroup, waveEnemyGroup, HitWaveEnemy, null, this)
    // waves[0].emit('waveComplete');
}