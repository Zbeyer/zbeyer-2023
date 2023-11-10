import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import { Session } from 'meteor/session';
import './main.html';
let getAddress = function() {
	let address = window;
	// if (!address) {
	// 	address = $.get("https://ipinfo.io", function (response) {
	// 		address = response;
	// 		this.address = address;
	// 		//Session.set('currentUsersIpAddress', address);
	// 	}, "json");
	// }
	return address;
};

Template.ZbeyerHome.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.address = new ReactiveVar();
});

Template.ZbeyerHome.helpers({
  address() {
	  let instance = Template.instance();
	  instance.address.set(getAddress());

    return instance.address.get();
  },
});

Template.ZbeyerHome.events({
  'click button'(event, instance) {
	  instance.address.set(getAddress());
  },
});

