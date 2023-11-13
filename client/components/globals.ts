function stripHTML(s: string){
	s = s.replace(/(<([^>]+)>)/ig, '');
	return s;
}
Template.registerHelper('stripHTML', stripHTML)

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