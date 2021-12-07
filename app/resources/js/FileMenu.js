/* eslint-env browser */

var dropBoxes = [];

function initMenu(menuEl) {
    dropBoxes = menuEl.querySelectorAll('.drop-box');
    dropBoxes.forEach(function (dropBox) {
        dropBox.addEventListener("dragstart", event => {
            if(dropBox.id !== undefined) {
                event.dataTransfer.setData("text", dropBox.id);
            }
        });
    });
}

/** Checks which of the preview elements is not yet occupied 
 *  and then adds a preview image of the currently added video to the FileMenu
 */
function checkMenuOccupation(id, img) {
    for (let i = 0; i < dropBoxes.length; i++) {
        if(dropBoxes[i].classList.contains('occupied') === false) {
            dropBoxes[i].children[0].src = img;
            dropBoxes[i].id = id;
            dropBoxes[i].classList.add('occupied');
            break;
        }
    }
}

class FileMenu {
    constructor(menuEl) {
        this.menu = [];
        this.menuEl = menuEl;
        initMenu(menuEl);
    }
    addToMenu(id, img) {
        checkMenuOccupation(id, img);
    }
}

export default FileMenu;