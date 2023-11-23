import 'phaser'

export default {
	parent: 'game',
	render: {
		pixelArt: true,
	},
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT,
		height: 640,
		width: 640,
	},
	callbacks: {
		postBoot: () => {
			console.log('postBoot callback');
			// window.sizeChanged();
		},
	},
	audio: {
		disableWebAudio: false,
	}
};
