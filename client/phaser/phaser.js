"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("phaser");
Template.game.onCreated(function () {
    console.log('game created');
    var config = {
        title: 'Zbeyer',
        type: Phaser.WEBGL,
        // backgroundColor: '#000000',
        backgroundColor: '#303030',
        render: {
            antialiasGL: false,
            pixelArt: true,
        },
        scale: {
            mode: Phaser.Scale.ScaleModes.NONE,
            height: 640,
            width: 640, //480,
        },
        callbacks: {
            postBoot: function () {
                console.log('postBoot callback');
            },
        },
        canvasStyle: "display: block; width: 100%; height: 100%;",
        autoFocus: true,
        audio: {
            disableWebAudio: false,
        }
    };
    var game = new Phaser.Game(config);
});
