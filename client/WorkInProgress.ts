import { Template } from 'meteor/templating';
import SlideMatch from './games/sm';

Template.workInProgress.onCreated(function () {
	SlideMatch.newGame();
});

Template.workInProgress.onDestroyed(function () {
	SlideMatch.quitGame();
});