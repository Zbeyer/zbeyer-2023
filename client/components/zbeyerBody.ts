// import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {Session} from 'meteor/session';

interface DocumentInterface {
	title: string;
	path: string;
	type?: string;
	body?: string;
}

let addDocumentToSession = function (fileName: string) {
	let docName = 'document_' + fileName;
	let doc = Session.get(docName);

	fetch(fileName).then((resp) => resp.text()).then(function (data) {
		doc = data;
		// doc = doc.replace(/\n/g, '<br/>');

		Session.set(docName, doc);
	});
	return doc;
};

let animateScrollingToTop = function () {
	const loop = 16;
	let runScrollAnimation = setInterval(function () {
		let scrollTo = scrollY - 64.0;
		if(scrollTo < 0) { scrollTo = 0; }
		if (scrollTo <= 0) {
			clearInterval(runScrollAnimation);
		} else {
			window.scrollTo(0, scrollTo);
		}
	}, loop);
};

const doNotRenderDocumentTypes = ['pdf', 'doc', 'docx', 'js', 'ts', 'json', 'md', 'json', 'jpg', 'jpeg', 'png', 'gif', 'svg', 'ico']
const doNotRenderCodeForDocumentTypes = ['md', 'doc', 'docx', 'pdf', 'jpg', 'jpeg', 'png', 'gif', 'svg', 'ico'];
const renderImageTypes = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'ico'];
const docs = [
	{ path: 'docs/howtosetupmymac.md', title: 'Mac Setup'},
	{ path: 'docs/Zachary Beyer-2019-resume-one page.docx', title: '2019 Resume'},
	{ path: 'docs/resume.md', title: 'Modern Resume'},
	{ path: 'colorList.pdf', title: 'PDF File'},
	// { path: 'docs/helloWorld.html', title: 'Hello World'},
	// { path: 'docs/colors.json', title: 'Colors JSON'},
	{
		path: 'docs/colors.html',
		title: 'Colors',
		type: 'html'
	},
	{ path: 'bear.png', title: 'Bear Image'}
];

let isDocumentTypeInList = function(type: string, list: string[]) {
	return list.indexOf(type) >= 0;
};

let documentType = function (doc: DocumentInterface) {
	return doc.path.split('.').pop();
};

Template.mainBody.onCreated(function helloOnCreated() {
	this.showGame = new ReactiveVar(false);
	this.zbeyerStep = new ReactiveVar(0);
	// this.colors = new ReactiveVar(colors());
	// this.colorKeys = new ReactiveVar(['grey', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']);

	this.docs = new ReactiveVar(docs);
	this.activeDoc = new ReactiveVar(null);
	docs.forEach(function (doc: DocumentInterface) {
		let path = doc.path || '';
		if (!doc.type) {
			doc.type = doc.path.split('.').pop();
		}
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
	docs() {
		return Template.instance().docs.get();
	},
	activeDoc() {
		return Template.instance().activeDoc.get();
	},
	shouldNotRenderDoc() {
		let doc = Template.instance().activeDoc.get();
		if (!doc) { return true; }

		let type = doc.type || documentType(doc);
		type = type.toLowerCase();
		return isDocumentTypeInList(type, doNotRenderDocumentTypes);
	},
	shouldNotRenderCode() {
		let doc = Template.instance().activeDoc.get();
		if (!doc) { return true; }

		let type = doc.type || documentType(doc);
		type = type.toLowerCase();
		return isDocumentTypeInList(type, doNotRenderCodeForDocumentTypes);
	},
	shouldRenderImage() {
		let doc = Template.instance().activeDoc.get();
		if (!doc) { return false; }

		let type = doc.type || documentType(doc);
		type = type.toLowerCase();
		return isDocumentTypeInList(type, renderImageTypes);
	},
	isActiveDocMarkdown() {
		let doc = Template.instance().activeDoc.get();
		if (!doc) { return false; }
		let type = doc.type || documentType(doc);
		type = type.toLowerCase();
		return type == 'md';
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
		let path = event.currentTarget.getAttribute("data-path");
		let title = event.currentTarget.getAttribute("data-title");
		let type = event.currentTarget.getAttribute("data-type");
		let document: DocumentInterface = {
			title: title,
			path: path,
			body: addDocumentToSession(path)
		}
		animateScrollingToTop();
		instance.activeDoc.set(document);
	}
});