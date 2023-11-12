import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

Template.stepper.onCreated(	function() {
	this.step = new ReactiveVar(0);
	let step = this.step.get() || this.data.step
	this.step.set(step);

});

Template.stepper.helpers({
	step() { return Template.instance().step.get(); },
});