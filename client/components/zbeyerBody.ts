// import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {Session} from 'meteor/session';

interface DocumentInterface {
	title: string;
	path: string;
	body?: string;
}

let addDocumentToSession = function (fileName: string) {
	let docName = 'document_' + fileName;
	let doc = Session.get(docName);

	fetch(fileName).then((resp) => resp.text()).then(function (data) {
		doc = data;
		// doc = doc.replace(/\n/g, '<br/>');

		Session.set(docName, doc);
		console.log("addDocumentToSession\n\t%o\n\t%o", fileName, doc);

	});
	return doc;
}

Template.mainBody.onCreated(function helloOnCreated() {
	this.showGame = new ReactiveVar(false);
	this.zbeyerStep = new ReactiveVar(0);
	// this.colors = new ReactiveVar(colors());
	// this.colorKeys = new ReactiveVar(['grey', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']);
	let docs = [
		// {path: 'docs/colors.json', title: 'Colors JSON'},
		{path: 'docs/colors.html', title: 'Colors'},
		{path: 'docs/helloWorld.html', title: 'Hello World'},
	];
	this.docs = new ReactiveVar(docs);
	this.activeDoc = new ReactiveVar(null);
	docs.forEach(function (doc: DocumentInterface) {
		let path = doc.path || '';
		doc.body = addDocumentToSession(path) || '';
	});
});

Template.mainBody.onRendered(function () {
	console.log("mainBody rendered");
});

Template.mainBody.helpers({
	showGame() {
		return Template.instance().showGame.get();
	},
	// stepper() {
	// 	return Template.instance().zbeyerStep.get();
	// },
	docs() {
		return Template.instance().docs.get();
	},
	activeDoc() {
		return Template.instance().activeDoc.get();
	}
});

Template.mainBody.events({
	'click button': function (event, instance) {
		console.log("button clicked");
	},
	'click button.showGameButton': function (event, instance) {
		instance.showGame.set(true);
	},
	'click button.hideGameButton': function (event, instance) {
		instance.showGame.set(false);
	},
	'click button.reduceStep': function (event, instance) {
		let step = instance.zbeyerStep.get();
		step--;
		Math.max(step, 0);
		instance.zbeyerStep.set(step);
	},
	'click button.increaseStep': function (event, instance) {
		let step = instance.zbeyerStep.get();
		step++;
		if (step > 3) {
			step = 3;
		}
		instance.zbeyerStep.set(step);
	},
	'click .js-readMore': function (event, instance) {
		let path=event.currentTarget.getAttribute("data-path");
		let title=event.currentTarget.getAttribute("data-title");
		let document: DocumentInterface = {
			title: title,
			path: path,
			body: addDocumentToSession(path)
		}

		instance.activeDoc.set(document);
		// console.log("readMore clicked\n\t%o\n\t%o\n\t%o",event, instance, document);
	}
});