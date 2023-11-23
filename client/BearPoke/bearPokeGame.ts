import BearPokeGame from "./game";
import {Template} from "meteor/templating";

let animateScrollingToGame = function () {
	const loop = 0.5;
	const element = $('canvas')[0];
	// let limit = Math.max( document.body.scrollHeight, document.body.offsetHeight,
	// 	document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
	// console.log('limit: %o', limit);

	let scrollTarget = element.getBoundingClientRect().bottom;
	// scrollTarget = Math.floor(scrollTarget);
	// scrollTarget = Math.min(scrollTarget, limit);

	let last = -1;
	let runScrollAnimation = setInterval(function () {
		let scrollY = window.scrollY;
		// console.log('scrollY: %o', scrollY);
		let scrollTo =  scrollY + 16.0;
		if (last === scrollY) {
			clearInterval(runScrollAnimation);
		} else {
			window.scrollTo(0, scrollTo);
			last = scrollY;
		}
	}, loop);
};

Template.BearPokeGame.onCreated(function() {
	console.log("BearPokeGame created");
	BearPokeGame.newGame();
	animateScrollingToGame();
});

Template.BearPokeGame.onRendered(function() {
	console.log("BearPokeGame rendered");
});

Template.BearPokeGame.onDestroyed(function() {
	console.log("BearPokeGame destroyed");
	BearPokeGame.quit();
});

