// import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

// let lastRun = 0;

Template.mainBody.onCreated(function helloOnCreated() {
	this.showGame = new ReactiveVar(false);
});

Template.mainBody.helpers({
	showGame() {
		return Template.instance().showGame.get();
	},
});

Template.mainBody.events({
	'click button': function (event, instance) {
		console.log("button clicked");
	},
	'click button.showGameButton': function(event, instance) {
		// let now = (new Date).getTime();
		// let delta = now - lastRun;
		// if (delta && (delta < 1000)) {
		//   console.log("showGameButton clicked but terminated early: \n\t%o", delta);
		//   return;
		// }
		//
		// lastRun = now;
		// console.log("showGameButton clicked: \n\t%o", delta);
		instance.showGame.set(true);
	},
	'click button.hideGameButton': function(event, instance) {
		instance.showGame.set(false);
	}
});