import { Session } from 'meteor/session';
import 'phaser';
import BootScene from "./Shared Scenes/boot";
import PreloaderScene from "./Shared Scenes/preload";

export default class Game
{
	name: string;
	config: object;
	game?: Phaser.Game = null;
	constructor(name: string = "Game")
	{
		this.name = name;
		this.config = {
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
		console.log("Game constructor");
	}
	static shared()
	{
		let g = Session.get("Game_Shared");
		if (!g) {
			g = new Game();
			Session.set("Game_Shared", g);
		}
		return g;
	}

	/** Games follow the singleton pattern... **/


	static newGame(): Game
	{
		let g = Game.shared();
		let config: object 		= g.config;
		let game: Phaser.Game 	= g.game;
		if (!game) game 		= new Phaser.Game(config);
		g.game = game;
		game.scene.add('Boot', BootScene);
		game.scene.add('Preloader', PreloaderScene);
		game.scene.start('Boot');
		console.log("newGame %o", g);
		return g;
	}

	static quitGame(): Game
	{
		let g = Game.shared();
		let game = g.game;
		game.destroy(true);
		console.log("quitGame %o", game);
		return g;

	}
}

}
