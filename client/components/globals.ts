function stripHTML(s: string){
	s = s.replace(/(<([^>]+)>)/ig, '');
	return s;
}

Meteor.startup(function(){
	markdown.register('before',function(content){
		console.log(content.data); //raw markdown string
	});
	markdown.register('json',function(content){
		console.log(content); //JsonML tree
	});
	markdown.register('html',function(content){
		console.log(content); //html json tree
	});
	markdown.register('after',function(content){
		console.log(content.data); //rendered html
	});
})

Template.registerHelper('stripHTML', stripHTML);
Template.registerHelper('eq', function(a,b){
	return a == b;
});

Template.registerHelper('getSeeion', function(key: string){
	return Session.get(key);
};
Template.registerHelper('setSession', function(key: string, value: any){
	return Session.set(key, value);
};
