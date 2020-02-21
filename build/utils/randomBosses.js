import Boss from "../scenes/core/Boss";

let backgroundBar;
let healthBar;
let health_frame;

let state = {
    scene: null
};

const updateState = (data) => {
    state = Object.assign({}, state, data);
};

const HitBoss = (boss, bulletGroup) => {
    boss.health -= 3;
    healthBar.setScale(boss.health / boss.maxHealth, 1);
    bulletGroup.destroy();
    if (boss.health <= 0) {
        state.scene.bossCount--;
        state.scene.canRoll = true;
        let x = boss.maxHealth * 2 + Math.floor(Math.random() * 101)
        state.score.total += x;
        console.log("You get " + x + " point.")
        tearDownBossProps();
        const stopBossMovement = new Promise(resolve => {
            resolve(boss.removeBossMoving());
        });
        stopBossMovement.then(() => {
            boss.bossStopShooting();
            boss.destroy();
        });
    }
};

function touchingBossBullet(player, bossBullet) {
    bossBullet.destroy();
    state.scene.healthPlayer = state.scene.healthPlayer - 1;
    if (state.scene.healthPlayer === 2) {
        state.scene.heart3.setVisible(false);
    }
    else if (state.scene.healthPlayer === 1) {
        state.scene.heart2.setVisible(false);
    }
    else if (state.scene.healthPlayer === 0) {
        state.scene.heart1.setVisible(false);
        tearDownBossProps();
    }
}

const setUpBossPropsOn = function (scene) {
    backgroundBar = scene.add.image(240, 25, 'black-bar').setOrigin(0, 0);
    backgroundBar.fixedToCamera = true;
    healthBar = scene.add.image(240, 25, 'red-bar').setOrigin(0, 0);
    healthBar.fixedToCamera = true;
    health_frame = scene.add.image(171, 20, 'health_frame').setOrigin(0, 0);
    ///////////////////////////////////////////////////////////////////////
    health_frame.setDepth(1);
    backgroundBar.setDepth(1);
    healthBar.setDepth(1);
    backgroundBar.setVisible(true);
    healthBar.setVisible(true);
    health_frame.setVisible(true);
};

const tearDownBossProps = function () {
    backgroundBar.destroy();
    healthBar.destroy();
    health_frame.destroy();
    state.scene.canRoll = true;
};

const bossSpawner = {
    spawn: function (bossKey, scene, player, bulletGroup) {
        setUpBossPropsOn(scene);
        const boss = new Boss(scene, 300, 500, bossKey);
        state.scene.bossCount++;
        boss.health = Math.floor(Math.random() * 101) + 150;
        boss.maxHealth = boss.health;
        boss.setScale(0.8);
        boss.moveUp(200);
        boss.setWorldBound(true);
        boss.BossMoving(1000, 200, -200);
        if (bossKey == 'boss1') {
            boss.setoffset(-10, -50)
            boss.setSize(1.5, 1.5)
        }
        // boss1.setoffset()
        /**************************************************************** */
        const bulletBossGroup = boss.bossIsShootingArcade(bossKey === 'boss1' ?
            'bossBullet' : 'bossBullet2', boss);
        /*************************************************************** */
        if (bossKey === 'boss1') {
            boss.playAnimateB.call(state, boss, bossKey, 12);
        } else if (bossKey === 'boss2') {
            boss.playAnimateB2.call(state, boss, bossKey, 12);
        }
        //////////////////////////////////////////////////////////////////////////////////////////
        scene.physics.add.overlap(boss, bulletGroup, HitBoss, null, this);
        scene.physics.add.overlap(player, bulletBossGroup, touchingBossBullet, null, this);
    }
};

const getBoss = {
    0: 'boss1',
    1: 'boss2'
};

const spawnRandomBoss = function (data) {
    const { scene, player, score } = data;
    updateState({ scene, player, score });
    if (scene.bossCount === 0) {
        const boss = getBoss[Math.floor(Math.random() + 0.5)];
        bossSpawner.spawn(boss, scene, player, scene.bulletGroup);
    }
};


export default spawnRandomBoss;