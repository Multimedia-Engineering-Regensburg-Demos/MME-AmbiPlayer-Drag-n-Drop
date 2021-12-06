/* eslint-env browser */

import VideoPlayer from "./utils/VideoPlayer.js";
import AmbilightContainer from "../../vendors/ambilight.js/index.js";
import FileManager from "./utils/FileManager.js";

var player,
    fileManager,
    ambiPlayer;

function init() {
    let videoEl = document.querySelector("#player");

    player = new VideoPlayer(videoEl);
    fileManager = new FileManager();

    player.addEventListener("videoFrameChanged", onVideoFrameChanged);
    fileManager.addEventListener("newFileSelected", onVideoFileSelected);
    ambiPlayer = new AmbilightContainer(videoEl);
}

function onVideoFrameChanged(event) {
    ambiPlayer.update(event.data);
}

function onVideoFileSelected(event) {
    console.log(event);
    player.onVideoFileSelected(event.data);
}

init();