import * as start from "./start.js";

import {
    alisMainContainer,
    alisNextBtn,
    alisPrevBtn,
    alisZoomInBtn,
    alisZoomOutBtn,
    alisRotateLeftBtn,
    alisRotateRightBtn,
    alisMainImg

} from "./variables.js";

import {
    open,
    close,
    next,
    prev,
    zoomIn,
    zoomOut,
    rotateLeft,
    rotateRight
} from "./functions.js";

import {
    links
} from "./variables.js";

//Open Lighbox by clicking on link
links.forEach((link) => [
    link.addEventListener('click', (event) => {
        //Disabling Links
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
        //open image
        open(event.currentTarget)
    })
])

//Close lightbox by click on div
alisMainContainer.addEventListener('click', (event) => {
    if (event.target.tagName == 'DIV') {
        close();
    }
})

//Go next by click to button
alisNextBtn.addEventListener('click', () => {
    next()
})

//Go prev by click to button
alisPrevBtn.addEventListener('click', () => {
    prev()
})

//Zoom In
alisZoomInBtn.addEventListener('click', () => {
    zoomIn()
})

//Zoom Out
alisZoomOutBtn.addEventListener('click', () => {
    zoomOut()
})

//rotate left
alisRotateLeftBtn.addEventListener('click', () => {
    rotateLeft()
})

//Rotate right
alisRotateRightBtn.addEventListener('click', () => {
    rotateRight()
})

//keyboard
document.body.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) {
        prev()
    } else if (e.keyCode == 39) {
        next()
    } else if (e.keyCode == 38) {
        alisMainContainer.style.display == 'block' ? zoomIn(e) : ' ';
    } else if (e.keyCode == 40) {
        alisMainContainer.style.display == 'block' ? zoomOut(e) : '';
    }
})