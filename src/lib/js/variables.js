//Main Container
export var alisMainContainer = document.getElementById("alisMainContainer")
//Main Image
export var alisMainImg = document.getElementById("alisMainImg")

//Rotate Buttons
export var alisRotateLeftBtn = document.getElementById("alisRotateLeftBtn")
export var alisRotateRightBtn = document.getElementById("alisRotateRightBtn")
//Prev Play Next Buttons
export var alisPrevBtn = document.getElementById("alisPrevBtn")
export var alisNextBtn = document.getElementById("alisNextBtn")
//Zoom Buttons
export var alisZoomInBtn = document.getElementById("alisZoomInBtn")
export var alisZoomOutBtn = document.getElementById("alisZoomOutBtn")

//Get User Datas
let galleriesArr = [];
document.querySelectorAll('a[alis-lb]').forEach(element => {
    galleriesArr.push(element.getAttribute("alis-lb"))
});

new Set(galleriesArr).forEach(
    (gallery) => {
        document.querySelectorAll(`a[alis-lb=${gallery}]`).forEach((elm, i) => {
            elm.setAttribute("alisID", i);
        })
    }
)

//All links
export var links = document.querySelectorAll('a[alis-lb]');

//Image title tag
export var alisImageTitle = document.getElementById("alisImageTitle");