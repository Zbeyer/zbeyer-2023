import 'phaser'

export default class PreloaderScene extends Phaser.Scene
{
	constructor() {
		super ({ key: 'Preloader' })
	}

	preload () {}

	create ()
	{
		const game = this;
		const scene = game.scene;
		// scene.stop('Preloader');
		let text = game.add.text(0, 0, "Preloader", { font: "65px Arial", fill: "#ff0044", align: "center" });
		console.log("PreloaderScene created");
	}

}