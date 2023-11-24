import { Session } from 'meteor/session';
import 'phaser';

export default class SlideMatch
{
	game?:Phaser.Game = null;

	constructor()
	{
		console.log("SlideMatch constructor");
	}

	/** Games follow the singleton pattern... **/
	static shared()
	{
		let sm = Session.get("SlideMatch_Game");
		if (!sm) {
			sm = new SlideMatch();
			Session.set("SlideMatch_Game", sm);
		}

		return sm;
	}

	static newGame(): SlideMatch
	{
		let sm = SlideMatch.shared();
		let config: any = {
				render: {
					pixelArt: true,
				},
				scale: {
					mode: Phaser.Scale.ScaleModes.FIT,
					height: 640,
					width: 640,
				},
				audio: {
					disableWebAudio: false,
				}
			};
		let game = sm.game;
		if (!game)
		{
			game = new Phaser.Game(config);
		}

		console.log("newGame %o", game);
		return sm;
	}

	static quitGame(): SlideMatch
	{
		let game = SlideMatch.shared();
		game.destroy(true);
		console.log("quitGame %o", game);
		return game;

	}
};
