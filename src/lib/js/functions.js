import {
	alisMainContainer,
	alisMainImg,
	alisImageTitle,
	alisCounter,
	alisLoader,
	alisGalleryTitle
} from "./variables.js";

//Check is touch device or browser
var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
var WINDOW = IS_BROWSER ? window : {};
var IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;

//Making variables
var galleryName, Index, scale = 1,
	rotate = 0,
	galleryLength, title, path, left, top;

function alisFadeOut(element) {
	// element.style.opacity = "0%";
	element.style.animation = "fadeOut"
	element.style.animationDuration = "0s"
	element.style.animationFillMode = "forwards"
}

function alisFadeIn(element) {
	element.style.animation = "fadeIn";
	element.style.animationDuration = "1s"
	element.style.animationFillMode = "forwards";
}

function alisImageSetData() {
	//image
	alisMainImg.setAttribute('src', path)
	//title
	alisImageTitle.innerText = title;
	//counter
	alisCounter.innerText = `${Index + 1} / ${galleryLength}`
}

function loadImage() {
	return new Promise((resolve, reject) => {
		alisMainImg.onload = function () {
			resolve(true)
			console.log("ali")
		}

	})
}

function alisGetPath() {
	return document.querySelectorAll(`a[alis-lb=${galleryName}]`)[Index].getAttribute("href")
}

function alisGetTitle() {
	return document.querySelectorAll(`a[alis-lb=${galleryName}]`)[Index].getAttribute("alis-lb-title")
}

alisResetPosition()

function alisResetPosition() {
	//Position
	alisMainImg.style.setProperty('--alisImgLeft', '50%')
	alisMainImg.style.setProperty('--alisImgTop', '50%')
}

function alisRemoveTransform() {
	scale = 1;
	rotate = 0;
	alisSetTransform()
}

function alisSetTransform() {
	alisMainImg.style.setProperty('--alisImgScale', scale)
	alisMainImg.style.setProperty('--alisImgRotate', rotate + 'deg')
}

function alisMoveImage() {
	alisMainImg.style.setProperty('--alisImgLeft', left)
	alisMainImg.style.setProperty('--alisImgTop', top)
}

function nextPrevButtonDispaly(dispaly) {
	document.body.style.setProperty("--aliNextPrevButtonDispaly", dispaly)
}

//Open Lightbox
export function open(link) {
	alisMainContainer.style.display = 'block'
	alisFadeIn(alisLoader)
	//Getting link
	path = link.getAttribute('href')
	//Getting name of gallery
	galleryName = link.getAttribute('alis-lb')
	alisGalleryTitle.innerText = galleryName
	//Getting index of clicked link. I add the alisIndex programicly in the variables.js file
	Index = parseInt(link.getAttribute('alisIndex'))
	//Getting Gallery length
	galleryLength = document.querySelectorAll(`a[alis-lb=${galleryName}]`).length
	galleryLength == 1 ? nextPrevButtonDispaly("none") : nextPrevButtonDispaly("block");
	//Getting image title
	title = link.getAttribute('alis-lb-title')
	alisImageSetData()
	loadImage().then(
		() => {
			alisFadeIn(alisMainImg)
			alisFadeOut(alisLoader)
		}
	)
}

//Close lightbox
export function close() {
	alisFadeOut(alisMainImg)
	path = '';
	title = '';
	alisRemoveTransform()
	alisResetPosition()
	alisMainContainer.style.display = 'none'
}

export function next() {
	if (galleryLength == 1) {
		return
	}

	alisRemoveTransform()
	alisFadeOut(alisMainImg)
	alisFadeIn(alisLoader)
	//Get index of the next img or its the last image go to the first
	galleryLength - 1 == Index ? Index = 0 : Index++;
	//Get path of the next image
	path = alisGetPath()
	//Get title of the next image
	title = alisGetTitle()
	//Reset image position
	alisImageSetData()
	loadImage().then(
		() => {
			alisFadeIn(alisMainImg)
			alisFadeOut(alisLoader)
			//Set data to image
			alisResetPosition()
		}
	)
}
export function prev() {
	if (galleryLength == 1) {
		return
	}

	alisRemoveTransform()
	alisFadeOut(alisMainImg)
	alisFadeIn(alisLoader)
	Index == 0 ? Index = galleryLength - 1 : Index--;
	//Get path
	path = alisGetPath()
	//Get title of the next image
	title = alisGetTitle()
	alisImageSetData()
	loadImage().then(
		() => {
			alisFadeIn(alisMainImg)
			alisFadeOut(alisLoader)
			//Set data to image
			alisResetPosition()
		}
	)
}
export function zoomIn() {
	//Prevent for scroll with button 
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
	scale += .2;
	alisSetTransform()
}
export function zoomOut() {
	//Prevent for scroll with button 
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
	scale <= 0.4 ? scale = 0.2 : scale = scale - 0.2
	alisSetTransform()
}
export function rotateRight() {
	rotate = rotate + 90;
	alisSetTransform()
}
export function rotateLeft() {
	rotate = rotate - 90;
	alisSetTransform()
}

//Moving image
if (IS_TOUCH_DEVICE) {
	alisMainImg.addEventListener("touchstart", (e) => {
		//prevent defaul for scroll with touch
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}

		var x = e.touches[0].pageX - e.touches[0].target.offsetLeft;
		var y = e.touches[0].pageY - e.touches[0].target.offsetTop;
		alisMainImg.addEventListener("touchmove", (e) => {
			let mouseLeft = parseInt(e.touches[0].pageX);
			let mouseTop = parseInt(e.touches[0].pageY);
			left = `${mouseLeft - x}px`;
			top = `${mouseTop - y}px`;
			alisMoveImage()
		})
		alisMainImg.addEventListener("touchend", (e) => {
			alisMainImg.onmousemove = () => {}
		})
	})
} else {
	alisMainImg.addEventListener("mousedown", (e) => {
		var x = e.pageX - e.target.offsetLeft;
		var y = e.pageY - e.target.offsetTop;
		alisMainContainer.onmousemove = (e) => {
			let mouseLeft = parseInt(e.pageX);
			let mouseTop = parseInt(e.pageY);
			left = `${mouseLeft - x}px`;
			top = `${mouseTop - y}px`;
			alisMoveImage()
		}
		alisMainContainer.addEventListener("mouseup", (e) => {
			alisMainContainer.onmousemove = () => {}
		})
	})
}



















// function updateImageData() {
//     //update image
//     alisMainImg.setAttribute("src", path)

//     //update title
//     alisImageTitle.innerText = title

//     //update counter
//     alisCounter.innerText = `${Index+1} / ${galleryLength}`

//     //add transfrom
//     alisMainImg.style.transform = `rotate(${rotate}deg) scale(${scale})`
// }

// function resetImageData() {
//     //Reset variables
//     scale = 1;
//     rotate = 0;

//     //Position
//     alisMainImg.style.left = window.innerWidth / 2 - alisMainImg.clientWidth / 2 + 'px';
//     alisMainImg.style.top = window.innerHeight / 2 - alisMainImg.clientHeight / 2 - 30 + 'px';

//     //Transform
//     alisMainImg.style.transform = '';
//     alisCounter.innerText = '';
// }

// function resetClickes() {
//     alisMainImg.onmousemove = () => {}
// }

// export function open(elmt) {
//     if (event.preventDefault) {
//         event.preventDefault();
//     } else {
//         event.returnValue = false;
//     }
//     path = elmt.getAttribute("href")
//     theGallery = elmt.getAttribute("alis-lb")

//     //I add alisIndex attribute programicly
//     Index = parseInt(elmt.getAttribute("alisIndex"))

//     // alisMainImg.setAttribute("alisIndex", elmt.getAttribute("alisIndex"));
//     title = document.querySelectorAll(`a[alis-lb=${theGallery}]`)[Index].getAttribute("alis-lb-title")
//     alisMainContainer.style.display = "block"
//     galleryLength = document.querySelectorAll(`a[alis-lb=${theGallery}]`).length;
//     updateImageData()
//     resetImageData()
//     resetClickes()
// }
// export function close() {
//     resetImageData()
//     alisMainContainer.style.display = "none"
// }

// export function next() {
//     let galleryLength = document.querySelectorAll(`a[alis-lb=${theGallery}]`).length - 1
//     galleryLength <= Index ? Index = 0 : Index++
//     path = document.querySelectorAll(`a[alis-lb=${theGallery}]`)[Index].getAttribute("href")
//     updateImageData()
//     resetImageData()
// }

// export function prev() {
//     alisMainImg.style.transform = ``
//     let galleryLength = document.querySelectorAll(`a[alis-lb=${theGallery}]`).length - 1;
//     Index <= 0 ? Index = galleryLength : Index--;
//     let title = document.querySelectorAll(`a[alis-lb=${theGallery}]`)[Index].getAttribute("alis-lb-title")
//     path = document.querySelectorAll(`a[alis-lb=${theGallery}]`)[Index].getAttribute("href")
//     alisImageTitle.innerText = title;
//     updateImageData()
//     resetImageData()
// }


// export function zoomIn(e) {
//     if (event.preventDefault) {
//         event.preventDefault();
//     } else {
//         event.returnValue = false;
//     }
//     scale = scale + 0.2;
//     updateImageData()
// }

// export function zoomOut() {
//     if (event.preventDefault) {
//         event.preventDefault();
//     } else {
//         event.returnValue = false;
//     }
//     if (scale <= 0.3) {

//     } else {
//         scale = scale - 0.2;
//         updateImageData()
//     }
// }
// export function rotateLeft() {
//     rotate -= 90;
//     updateImageData()
// }
// export function rotateRight() {
//     rotate += 90;
//     updateImageData()
// }

// if (IS_TOUCH_DEVICE) {
//     alisMainImg.addEventListener("touchstart", (e) => {
//         //prevent defaul for scroll with touch
//         if (e.preventDefault) {
//             e.preventDefault();
//         } else {
//             e.returnValue = false;
//         }

//         var x = e.touches[0].pageX - e.touches[0].target.offsetLeft;
//         var y = e.touches[0].pageY - e.touches[0].target.offsetTop;
//         alisMainImg.addEventListener("touchmove", (e) => {
//             let mouseLeft = parseInt(e.touches[0].pageX);
//             let mouseTop = parseInt(e.touches[0].pageY);
//             alisMainImg.style.left = `${mouseLeft - x}px`;
//             alisMainImg.style.top = `${mouseTop - y}px`;
//         })
//         alisMainImg.addEventListener("touchend", (e) => {
//             resetClickes()
//         })
//     })
// } else {
//     alisMainImg.addEventListener("mousedown", (e) => {
//         var x = e.pageX - e.target.offsetLeft;
//         var y = e.pageY - e.target.offsetTop;
//         alisMainImg.onmousemove = (e) => {
//             let mouseLeft = parseInt(e.pageX);
//             let mouseTop = parseInt(e.pageY);
//             alisMainImg.style.left = `${mouseLeft - x}px`;
//             alisMainImg.style.top = `${mouseTop - y}px`;
//         }
//         alisMainImg.addEventListener("mouseup", (e) => {
//             resetClickes()
//         })
//     })
// }