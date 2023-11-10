import 'phaser';
// import config from './Config/config';
import GameScene from './Scenes/GameScene';

Template.game.onCreated( () => {

	console.log('game created');

	let config = {
		title: 'Zbeyer',
		type: Phaser.WEBGL,
		// backgroundColor: '#000000',
		backgroundColor: '#303030',
		render: {
			antialiasGL: false,
			pixelArt: true,
		},
		scale: {
			mode: Phaser.Scale.ScaleModes.NONE,
			height: 640, // 480,
			width: 640, //480,
		},
		callbacks: {
			postBoot: () => {
				console.log('postBoot callback');
			},
		},
		canvasStyle: `display: block; width: 100%; height: 100%;`,
		autoFocus: true,
		audio: {
			disableWebAudio: false,
		}
	};
	let game = new Phaser.Game(config);
});
