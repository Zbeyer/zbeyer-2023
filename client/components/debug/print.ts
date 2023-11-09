import {Template} from "meteor/templating";

Template.printJSON.helpers({
	printJSON()
	{
		return JSON.stringify(Template.instance().data, null, "\t");
	}
});