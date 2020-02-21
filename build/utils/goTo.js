export const startScene = function(scene){
    this.scene.start(scene)
};

export const restartScene = function(scene){
    if (arguments.length === 0 || !scene) {
        this.scene.restart();
    } else this.scene.reset(scene)
};

export const pauseScenes = function(...scenes){
    if (scenes.length === 0){
        this.scene.pause();
    } else scenes.forEach(scene => this.scene.pause(scene));
};

export const resumeScenes = function(...scenes){
    if (scenes.length === 0){
        this.scene.resume();
    } else scenes.forEach(scene => this.scene.resume(scene));
};