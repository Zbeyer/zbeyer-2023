import 'phaser'

export default {
	parent: 'game',
	render: {
		pixelArt: true,
	},
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT,
		height: 768,
		width: 1024,
	},
	audio: {
		disableWebAudio: false,
	}
};
