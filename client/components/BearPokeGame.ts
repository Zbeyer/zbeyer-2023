Template.BearPokeGame.events({
	'change .js-slider': function (event, template) {
		let value = event.currentTarget.value;
		let key = event.currentTarget.getAttribute('data-key');
		// console.log('key: ' + key + ' value: ' + value);
		Session.set(key, value);
	}
});