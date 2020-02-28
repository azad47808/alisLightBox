import {
    alisMainContainer,
    alisMainImg,
    alisImageTitle
} from "./variables.js";
var theGallery, Index, scale = 1,
    rotate = 0;

export function open(elmt) {
    scale = 1;
    rotate = 0;
    let path = elmt.getAttribute("href")
    theGallery = elmt.getAttribute("alis-lb")
    Index = parseInt(elmt.getAttribute("alisID"))
    alisMainImg.setAttribute("src", path)
    alisMainImg.setAttribute("alisID", elmt.getAttribute("alisid"));
    let title = document.querySelectorAll(`a[alis-lb=${theGallery}]`)[Index].getAttribute("alis-lb-title")
    alisMainContainer.style.display = "block"
    alisImageTitle.innerText = title
    resetImagePosition()
}
var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
var WINDOW = IS_BROWSER ? window : {};
var IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;

function resetImagePosition() {
    alisMainImg.style.left = window.innerWidth / 2 - alisMainImg.clientWidth / 2 + 'px';
    alisMainImg.style.top = window.innerHeight / 2 - alisMainImg.clientHeight / 2 - 30 + 'px';
}

export function close() {
    alisMainImg.style.transform = ``
    alisMainContainer.style.display = "none"
}

export function next() {
    scale = 1;
    rotate = 0;
    alisMainImg.style.transform = ``
    let galleryLength = document.querySelectorAll(`a[alis-lb=${theGallery}]`).length - 1
    galleryLength <= Index ? Index = 0 : Index++
    let path = document.querySelectorAll(`a[alis-lb=${theGallery}]`)[Index].getAttribute("href")
    let title = document.querySelectorAll(`a[alis-lb=${theGallery}]`)[Index].getAttribute("alis-lb-title")
    alisMainImg.setAttribute("src", path)
    alisImageTitle.innerText = title;
    resetImagePosition()
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
    resetImagePosition()
}

function addTransform() {
    alisMainImg.style.transform = `rotate(${rotate}deg) scale(${scale})`
}

export function zoomIn(e) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
    scale = scale + 0.2;
    addTransform()
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
        addTransform()
    }
}

export function rotateLeft() {
    rotate -= 90;
    addTransform()
}

export function rotateRight() {
    rotate += 90;
    addTransform()
}

alisMainImg.addEventListener("mousedown", (e) => {
    console.log(IS_TOUCH_DEVICE)
    console.log(e)
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

})
alisMainImg.addEventListener("mouseup", (e) => {
    alisMainImg.onmousemove = (e) => {

    }
})


alisMainImg.addEventListener("touchstart", (e) => {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
    console.log(IS_TOUCH_DEVICE)
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

})


alisMainImg.addEventListener("touchend", (e) => {
    document.body.onmousemove = (e) => {

    }
})