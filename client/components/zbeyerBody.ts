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

interface ColorInterface {
	color: string;
	body?: string;
}
let getToKColors = function () {
	const colors: object[] =
	[
		{
			color: 'grey',
		}, {
			color: 'red',
		}, {
			color: 'orange'
		}, {
			color: 'yellow',
		}, {
			color: 'green',
		}, {
			color: 'blue',
		}, {
			color: 'indigo',
		}, {
			color: 'violet',
		}
	];

	return colors;
};

let addDocumentToSession = function (fileName: string, instance?: any) {
	let docName = 'document_' + fileName;
	let doc = Session.get(docName);
	if (!doc) {
		fetch(fileName).then((resp) => resp.text()).then(function (data) {
			doc = data;
			Session.set(docName, doc);
			// console.log("set doc %o", doc);
		}).then(function () {
			let now = (new Date()).getTime();
			if (instance) { instance.lastFetch = now; }
			Session.set('lastFetch', now);
		});
	}
	return doc;
};

let animateScrollingToTop = function () {
	const loop = 8;
	let runScrollAnimation = setInterval(function () {
		let scrollTo = scrollY - 64.0;
		if (scrollTo < 0) {
			scrollTo = 0;
		}
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
	{path: 'docs/Zachary Beyer-2019-resume-one page.docx', title: '2019 Resume'},
	{path: 'accessibility/main.md', title: 'Accessibility Notes'},
	{path: 'bear.png', title: 'Bear Image'},
	{path: 'bmc_qr.jpg', title: 'Buy me Coffee QR Image'},
	{path: 'docs/colors.html', title: 'Colors', type: 'html'},
	{path: 'docs/howtosetupmymac.md', title: 'Mac Setup'},
	{path: 'docs/resume.md', title: 'Modern Resume'},
	{path: 'docs/fibWhileLoop.js', title: 'NodeJS Fibonacci While Loop'},
	{path: 'docs/reversingALinkedList.js', title: 'NodeJS Reversing a Linked List'},
	{path: 'colorList.pdf', title: 'PDF File'},
];

let isDocumentTypeInList = function (type: string, list: string[]) {
	return list.indexOf(type) >= 0;
};

let documentType = function (doc: DocumentInterface) {
	return doc.path.split('.').pop();
};

Template.mainBody.onCreated(function helloOnCreated() {
	const instance = this;

	Session.set('bear_timer', 3_000);
	Session.set('bear_max_animals', 3);
	Session.set('bear_max_hearts', 7);


	let colorDocs: object[] = getToKColors();
	colorDocs.forEach(function (obj: object)
	{
		let name = obj.color || '';
		// console.log("name %o", name);
		let path = 'TowneOfKlock/' + name + '.md';
		obj.body = addDocumentToSession(path, instance);
	});
	docs.forEach(function (doc: DocumentInterface) {
		let path = doc.path || '';
		if (!doc.type) {
			doc.type = doc.path.split('.').pop();
		}
		doc.body = addDocumentToSession(path, instance);
	});
	const colors: string[] = [
		'grey',
		'red',
		'orange',
		'yellow',
		'green',
		'blue',
		'indigo',
		'violet'
	];
	this.steps = new ReactiveVar([
		'documents',
		'BearPoke',
		'towne of klock',
		'colors',
	]);
	this.tokColors = new ReactiveVar(colorDocs);
	this.colors = new ReactiveVar(colors);

	this.activeStep = new ReactiveVar(0);
	this.docs = new ReactiveVar(docs);
	this.activeDoc = new ReactiveVar(null);
});

Template.mainBody.onRendered(function () {
	console.log("mainBody rendered");
});

Template.mainBody.helpers({
	steps() {
		return Template.instance().steps.get();
	},
	color(color: string = '') {
		const instance = Template.instance();

		let colors: ColorInterface[] = instance.tokColors.get();
		let c: ColorInterface = colors.filter(function (obj) {
			return obj.color == color;
		})[0];
		let body = c.body;
		if (!body)
		{
			let path = 'TowneOfKlock/' + c.color + '.md';
			body = addDocumentToSession(path, instance);
			c.body = body;
		}
		return body;
	},
	activeStep() {
		let index = Template.instance().activeStep.get();
		let steps = Template.instance().steps.get();
		return steps[index];
	},
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
		if (!doc) {
			return true;
		}

		let type = doc.type || documentType(doc);
		type = type.toLowerCase();
		return isDocumentTypeInList(type, doNotRenderDocumentTypes);
	},
	colors() {
		return Template.instance().colors.get();
	},
	tokColors() {
		return Template.instance().tokColors.get();
	},
	captializeFirstLetter(name: string) {
		name = name || '';
		const firstLetter = name.charAt(0);
		const firstLetterCap = firstLetter.toUpperCase();
		const remainingLetters = name.slice(1);
		const capitalizedWord = firstLetterCap + remainingLetters;
		return capitalizedWord;
	},
	shouldNotRenderCode() {
		let doc = Template.instance().activeDoc.get();
		if (!doc) {
			return true;
		}

		let type = doc.type || documentType(doc);
		type = type.toLowerCase();
		return isDocumentTypeInList(type, doNotRenderCodeForDocumentTypes);
	},
	shouldRenderImage() {
		let doc = Template.instance().activeDoc.get();
		if (!doc) {
			return false;
		}

		let type = doc.type || documentType(doc);
		type = type.toLowerCase();
		return isDocumentTypeInList(type, renderImageTypes);
	},
	isActiveDocMarkdown() {
		let doc = Template.instance().activeDoc.get();
		if (!doc) {
			return false;
		}
		let type = doc.type || documentType(doc);
		type = type.toLowerCase();
		return type == 'md';
	}
});

Template.mainBody.events({
	// 'click button': function (event, instance) {
	// 	console.log("button clicked");
	// },
	'click button.showGameButton': function (event, instance) {
		instance.showGame.set(true);
	},
	'click button.hideGameButton': function (event, instance) {
		instance.showGame.set(false);
	},
	'click .js-readMore': function (event, instance) {
		let path = event.currentTarget.getAttribute("data-path");
		let title = event.currentTarget.getAttribute("data-title");
		let type = event.currentTarget.getAttribute("data-type");
		let document: DocumentInterface = {
			title: title,
			path: path,
			body: addDocumentToSession(path, instance)
		}
		animateScrollingToTop();
		instance.activeDoc.set(document);
	},
	'click .js-previous': function (event, instance) {
		let index = instance.activeStep.get();
		index--;
		if (index < 0) {
			index = 0;
		}
		instance.activeStep.set(index);
	},
	'click .js-next': function (event, instance) {
		let index = instance.activeStep.get();
		let steps = instance.steps.get();
		index++;
		if (index >= steps.length) {
			index = steps.length - 1;
		}
		instance.activeStep.set(index);
	},
});