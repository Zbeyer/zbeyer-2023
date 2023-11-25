import { Template } from 'meteor/templating';
import {SlideMatch} from './games/games';

Template.workInProgress.onCreated(function () {
	SlideMatch.newGame();
});

Template.workInProgress.onDestroyed(function () {
	SlideMatch.quitGame();
});