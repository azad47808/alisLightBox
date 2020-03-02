import {
    alisMainContainer,
    alisMainImg,
    alisImageTitle,
    alisCounter
} from "./variables.js";

//Check is touch device or browser
var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
var WINDOW = IS_BROWSER ? window : {};
var IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;

//Making variables
var theGallery, Index, scale = 1,
    rotate = 0,
    galleryLength;


function updateCounter() {
    alisCounter.innerText = `${Index+1} / ${galleryLength}`
}

function addTransform() {
    alisMainImg.style.transform = `rotate(${rotate}deg) scale(${scale})`

}

function updateImageData() {
    //updateCounter
    alisCounter.innerText = `${Index+1} / ${galleryLength}`

    //addTransfrom
    alisMainImg.style.transform = `rotate(${rotate}deg) scale(${scale})`
}

function resetImageData() {
    //Position
    alisMainImg.style.left = window.innerWidth / 2 - alisMainImg.clientWidth / 2 + 'px';
    alisMainImg.style.top = window.innerHeight / 2 - alisMainImg.clientHeight / 2 - 30 + 'px';
    //Transform
    alisMainImg.style.transform = ``
    alisCounter.innerText = '';
}

function resetClickes() {
    alisMainImg.onmousemove = (e) => {}
    document.body.onmousemove = (e) => {}
}

export function open(elmt) {

    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }

    scale = 1;
    rotate = 0;
    let path = elmt.getAttribute("href")
    theGallery = elmt.getAttribute("alis-lb")

    //I add alisID attribute programicly
    Index = parseInt(elmt.getAttribute("alisID"))
    alisMainImg.setAttribute("src", path)
    // alisMainImg.setAttribute("alisID", elmt.getAttribute("alisid"));
    let title = document.querySelectorAll(`a[alis-lb=${theGallery}]`)[Index].getAttribute("alis-lb-title")
    alisMainContainer.style.display = "block"
    alisImageTitle.innerText = title
    galleryLength = document.querySelectorAll(`a[alis-lb=${theGallery}]`).length;
    updateImageData()
    resetImageData()
    resetClickes()
}
export function close() {
    resetImageData()
    alisMainContainer.style.display = "none"
}

export function next() {
    scale = 1;
    rotate = 0;
    let galleryLength = document.querySelectorAll(`a[alis-lb=${theGallery}]`).length - 1
    galleryLength <= Index ? Index = 0 : Index++
    let path = document.querySelectorAll(`a[alis-lb=${theGallery}]`)[Index].getAttribute("href")
    let title = document.querySelectorAll(`a[alis-lb=${theGallery}]`)[Index].getAttribute("alis-lb-title")
    alisMainImg.setAttribute("src", path)
    alisImageTitle.innerText = title;
    resetImageData()
    updateImageData()
}

export function prev() {
    scale = 1;
    rotate = 0;
    alisMainImg.style.transform = ``
    let galleryLength = document.querySelectorAll(`a[alis-lb=${theGallery}]`).length - 1;
    Index <= 0 ? Index = galleryLength : Index--;
    let title = document.querySelectorAll(`a[alis-lb=${theGallery}]`)[Index].getAttribute("alis-lb-title")
    let path = document.querySelectorAll(`a[alis-lb=${theGallery}]`)[Index].getAttribute("href")
    alisMainImg.setAttribute("src", path)
    alisImageTitle.innerText = title;
    resetImageData()
    updateImageData()
}


export function zoomIn(e) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
    scale = scale + 0.2;
    updateImageData()
}

export function zoomOut() {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
    if (scale <= 0.3) {

    } else {
        scale = scale - 0.2;
        updateImageData()
    }
}

export function rotateLeft() {
    rotate -= 90;
    updateImageData()
}

export function rotateRight() {
    rotate += 90;
    updateImageData()
}

if (IS_TOUCH_DEVICE) {
    alisMainImg.addEventListener("touchstart", (e) => {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        var x = e.touches[0].pageX - e.touches[0].target.offsetLeft;
        var y = e.touches[0].pageY - e.touches[0].target.offsetTop;
        document.body.addEventListener("touchmove", (e) => {
            // let imgLeft = parseInt(alisMainImg.style.left.split('px')[0]);
            // let imgTop = parseInt(alisMainImg.style.top.split('px')[0]);
            let mouseLeft = parseInt(e.touches[0].pageX);
            let mouseTop = parseInt(e.touches[0].pageY);
            // let imgWidth = alisMainImg.clientWidth;
            // let imgHeight = alisMainImg.clientHeight;
            // let offsetX = mouseLeft - imgLeft;
            // let offsetY = mouseTop - imgTop;
            alisMainImg.style.left = `${mouseLeft - x}px`;
            alisMainImg.style.top = `${mouseTop - y}px`;
        })
        alisMainImg.addEventListener("touchend", (e) => {
            resetClickes()
        })
    })
} else {
    alisMainImg.addEventListener("mousedown", (e) => {
        var x = e.pageX - e.target.offsetLeft;
        var y = e.pageY - e.target.offsetTop;
        alisMainImg.onmousemove = (e) => {
            // let imgLeft = parseInt(alisMainImg.style.left.split('px')[0]);
            // let imgTop = parseInt(alisMainImg.style.top.split('px')[0]);
            let mouseLeft = parseInt(e.pageX);
            let mouseTop = parseInt(e.pageY);
            // let imgWidth = alisMainImg.clientWidth;
            // let imgHeight = alisMainImg.clientHeight;
            // let offsetX = mouseLeft - imgLeft;
            // let offsetY = mouseTop - imgTop;
            alisMainImg.style.left = `${mouseLeft - x}px`;
            alisMainImg.style.top = `${mouseTop - y}px`;
        }
        alisMainImg.addEventListener("mouseup", (e) => {
            resetClickes()
        })
    })
}