/* eslint-env browser */

import { Event, Observable } from "./Observable.js";

var fileList = [];

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
    manager.controls.dropZone.addEventListener("drop", onDrop.bind(manager));

    manager.controls.uploadEl.addEventListener("change", onVideoFileSelected.bind(manager));
    manager.controls.uploadButton.addEventListener("click", onFileButtonClicked.bind(manager));
}

function onDragOver(event) {
    event.preventDefault();
}

/** onDrop() gets called if a draggable object is dropped into the dropZone
 *  Two possibilities:
 *  (1) Load existing video from dropped preview-img
 *  (2) Add new files to FileManager
 */
function onDrop(event) {
    event.preventDefault();

    let menuId = event.dataTransfer.getData('text'),
        files = event.dataTransfer.files;

    if(menuId !== "") {
        this.fileSelected(parseInt(menuId));
    } else {
        parseFiles.call(this, files);
    }
}

function onFileButtonClicked() {
    this.controls.uploadEl.click();
}

function onVideoFileSelected() {
    let files = this.controls.uploadEl.files;
    parseFiles.call(this, files);
}

function parseFiles(files) {
    let fileEntry = {},
        fileId;
    for (let i = 0; i < files.length; i++) {
        if (files[i] && files[i].type === "video/mp4") {
            fileEntry.vid = URL.createObjectURL(files[i]);
            fileEntry.name = files[i].name;
        } else if (files[i] && files[i].type === "image/jpeg"){
            fileEntry.img = URL.createObjectURL(files[i]);
        }
    }
    
    // Error handling
    fileId = addFile.call(this, fileEntry);
    this.fileSelected(fileId);
}

function addFile(file) {
    let refFile = fileList.find(element => element.name === file.name),
        event;

    /** Checking if file is already added: 
     *  Yes: Return present fileId
     *  No: Add file and return new fileId
     * */ 
    if(refFile === undefined) {
        file.fileId = Date.now();
        fileList.push(file);

        event = new Event("videoFileAdded", file);
        this.notifyAll(event);
        return file.fileId;
    }
    return refFile.fileId;
}

/** FileManager manages multiple ways (drag'n'drop & file-upload) 
 *  to add video/img files to the application
 */
class FileManager extends Observable {
    constructor() {
        super();
        this.files = {};
        initManager(this);
    }

    /** Fires event to set new video in Videoplayer
     *  Triggers if 
     *  (1) new files are dragged into Videoplayer or 
     *  (2) video-preview from fileMenu is dragged into Videoplayer
     */
    fileSelected(id) {
        let file = fileList.find(element => element.fileId === id),
            event = new Event("newFileSelected", file);
        this.notifyAll(event);
    }
}

export default FileManager;