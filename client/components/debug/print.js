"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var templating_1 = require("meteor/templating");
templating_1.Template.printJSON.helpers({
    printJSON: function () {
        return JSON.stringify(templating_1.Template.instance().data, null, "\t");
    }
});
