import 'phaser';
// import config from './Config/config';
import GameScene from './Scenes/GameScene';
let game = null;
Template.game.onCreated( () => {
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
	// game = game || new Phaser.Game(config);
	console.log("game: %o", game);
});
