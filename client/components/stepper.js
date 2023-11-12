"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var templating_1 = require("meteor/templating");
var reactive_var_1 = require("meteor/reactive-var");
templating_1.Template.stepper.onCreated(function () {
    this.step = new reactive_var_1.ReactiveVar(0);
    var step = this.step.get() || this.data.step;
    this.step.set(step);
});
templating_1.Template.stepper.helpers({
    step: function () { return templating_1.Template.instance().step.get(); },
});
