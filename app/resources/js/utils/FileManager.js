/* eslint-env browser */

import { Event, Observable } from "./Observable.js";

function initManager(manager) {
    initControls(manager);
    initEvents(manager);
}

function initControls(manager) {
    manager.controls = {
        dropZone: document.querySelector("#player"),
        uploadButton: document.querySelector(".button.file"),
        uploadEl: document.querySelector(".upload"),
    };
}

function initEvents(manager) {
    manager.controls.dropZone.addEventListener("dragover", onDragOver.bind(manager));
    manager.controls.dropZone.addEventListener("drop", onVideoFileDropped.bind(manager));

    manager.controls.uploadEl.addEventListener("change", onVideoFileSelected.bind(manager));
    manager.controls.uploadButton.addEventListener("click", onFileButtonClicked.bind(manager));
}

function onDragOver(event) {
    event.preventDefault();
}

function onVideoFileDropped(event) {
    event.preventDefault();

    let file = event.dataTransfer.files[0];
    onFileLoaded(file);
}

function onFileButtonClicked() {
    this.controls.uploadEl.click();
}

function onVideoFileSelected() {
    let file = this.controls.uploadEl.files[0];
    onFileLoaded(file);
}

function onFileLoaded(file) {
    if (file && file.type === "video/mp4") {
        let fileId = this.addFile(file);
        this.fileSelected(fileId);
    }
}

class FileManager extends Observable {
    constructor() {
        super();
        this.files = {};
        initManager(this);
    }

    addFile(file) {
        let fileId = Date.now();
        this.files[fileId] = file;
        return fileId;
    }

    fileSelected(id) {
        let event = new Event("newFileSelected", this.files[id]);
        this.notifyAll(event);
    }
}

export default FileManager;