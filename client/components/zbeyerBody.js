"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Meteor } from 'meteor/meteor';
var templating_1 = require("meteor/templating");
var reactive_var_1 = require("meteor/reactive-var");
// let lastRun = 0;
templating_1.Template.mainBody.onCreated(function helloOnCreated() {
    this.showGame = new reactive_var_1.ReactiveVar(false);
});
templating_1.Template.mainBody.helpers({
    showGame: function () {
        return templating_1.Template.instance().showGame.get();
    },
});
templating_1.Template.mainBody.events({
    'click button': function (event, instance) {
        console.log("button clicked");
    },
    'click button.showGameButton': function (event, instance) {
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
    'click button.hideGameButton': function (event, instance) {
        instance.showGame.set(false);
    }
});
