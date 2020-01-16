export const preloadScene = (data) => {
    const { scene, key } = data
    switch (key) {
        case 'default':
            defaultPreload(scene);
    }
}

const defaultPreload = (scene) => {
    
    let progressBox = scene.add.graphics();
    let progressBar = scene.add.graphics();
    progressBox.fillStyle(0xffffff,1);
    progressBox.fillRect(140, 370, 320, 50);

    let width = scene.cameras.main.width;
    let height = scene.cameras.main.height;
    let loadingText = scene.make.text({
        x: 195,
        y: 340,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = scene.make.text({
        x: 445,
        y: 340,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);

    let assetText = scene.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });

    assetText.setOrigin(0.5, 0.5);
    scene.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0x000000, 1);
        progressBar.fillRect(150, 380, 300 * value, 30);
    });

    // scene.load.on('fileprogress', function (file) {
    //     assetText.setText('Loading asset: ' + file.key);
    //     console.dir(file)
    // });

    scene.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
    });

}