import 'phaser';
import GameConfig from './gameConfig'
import PreloaderScene from "./scenes/preloader";
import BootScene from "./scenes/boot";
import MainMenu from "./scenes/mainMenu";
import MainGame from "./scenes/mainGame";
import GameOver from "./scenes/gameOver";
import Credits from "./scenes/credits";
import QuitScreen from "./scenes/quit";
class BearPokeGame
{
	static 	newGame = function ()
	{
		console.log('BearPoke New Game');

		const gameConfig = GameConfig;
		let game = new Phaser.Game(gameConfig);
		this.game = game;
		game.scene.add('Boot', BootScene);
		game.scene.add('Preloader', PreloaderScene);
		game.scene.add('MainMenu', MainMenu);
		game.scene.add('MainGame', MainGame);
		game.scene.add('GameOver', GameOver);
		game.scene.add('Credits', Credits);
		game.scene.add('Quit', QuitScreen);

		game.scene.start('Boot');
		return game;
	}

	static quit = function ()
	{
		let game: phaser.Game = this.game;
		game.destroy(true);
	}

}

export default BearPokeGame;