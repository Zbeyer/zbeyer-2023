function stripHTML(s: string){
	s = s.replace(/(<([^>]+)>)/ig, '');
	return s;
}
Template.registerHelper('stripHTML', stripHTML)