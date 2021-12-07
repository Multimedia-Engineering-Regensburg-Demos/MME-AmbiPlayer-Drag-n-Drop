/* eslint-env browser */

import VideoPlayer from "./utils/VideoPlayer.js";
import AmbilightContainer from "../../vendors/ambilight.js/index.js";
import FileManager from "./utils/FileManager.js";
import FileMenu from "./FileMenu.js";

var player,
    fileManager,
    fileMenu,
    ambiPlayer;

function init() {
    let videoEl = document.querySelector("#player"),
        menuEl = document.querySelector("#file-menu");

    player = new VideoPlayer(videoEl);
    fileManager = new FileManager();
    fileMenu = new FileMenu(menuEl);
    ambiPlayer = new AmbilightContainer(videoEl);

    player.addEventListener("videoFrameChanged", onVideoFrameChanged);
    fileManager.addEventListener("newFileSelected", onVideoFileSelected);
    fileManager.addEventListener("videoFileAdded", onVideoFileAdded);
}

function onVideoFrameChanged(event) {
    ambiPlayer.update(event.data);
}

function onVideoFileAdded(event) {
    fileMenu.addToMenu(event.data.fileId, event.data.img);
}

function onVideoFileSelected(event) {
    player.onVideoFileSelected(event.data.vid);
}

init();