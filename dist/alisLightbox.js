!function(e){var t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,function(t){return e[t]}.bind(null,i));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){var n=document.createElement("DIV");n.innerHTML='\n    <div id="alisMainContainer" class="alis-main-container">\n    <div id="alisLoader">Loading</div>\n    <div class="alis-row alisCloseIcon">\n        X\n    </div>\n    <div class="alis-row alisCounter" id="alisCounter">\n        0 / 0\n    </div>\n    <div class="alis-img-container text-center">\n        <img id="alisMainImg" alt="sampleimage" draggable=false>\n    </div>\n    <div class="alis-buttons-container">\n    <div class="alis-row" style="justify-content: center">\n    <span id="alisImageTitle" class="text-center">Name of the image.jpg</span>\n    </div>\n    <div class="buttons-div alis-row text-center">\n        <span class="alis-nav-btn" id="alisRotateLeftBtn"></span>\n        <span class="alis-nav-btn" id="alisRotateRightBtn"></span>\n        <span class="alis-nav-btn" id="alisPrevBtn"></span>\n        <span class="alis-nav-btn" id="alisNextBtn"></span>\n        <span class="alis-nav-btn" id="alisZoomInBtn"></span>\n        <span class="alis-nav-btn" id="alisZoomOutBtn"></span>\n    </div>\n    </div>\n    </div>',document.body.appendChild(n)},function(e,t,n){"use strict";n.r(t);n(0);var a=document.getElementById("alisMainContainer"),i=document.getElementById("alisMainImg"),l=document.getElementById("alisRotateLeftBtn"),o=document.getElementById("alisRotateRightBtn"),s=document.getElementById("alisPrevBtn"),r=document.getElementById("alisNextBtn"),d=document.getElementById("alisZoomInBtn"),u=document.getElementById("alisZoomOutBtn");let c=[];document.querySelectorAll("a[alis-lb]").forEach(e=>{c.push(e.getAttribute("alis-lb"))}),new Set(c).forEach(e=>{document.querySelectorAll(`a[alis-lb=${e}]`).forEach((e,t)=>{e.setAttribute("alisIndex",t)})});var f,m,p,v,y,g,b,I=document.querySelectorAll("a[alis-lb]"),E=document.getElementById("alisImageTitle"),h=document.getElementById("alisCounter"),L=document.getElementById("alisLoader"),B="undefined"!=typeof window&&void 0!==window.document,x=B?window:{},w=!!B&&"ontouchstart"in x.document.documentElement,k=1,A=0;function P(e){e.style.animation="fadeOut",e.style.animationDuration="0s",e.style.animationFillMode="forwards"}function S(e){e.style.animation="fadeIn",e.style.animationDuration="1s",e.style.animationFillMode="forwards"}function D(){i.setAttribute("src",y),E.innerText=v,h.innerText=`${m+1} / ${p}`}function T(){return new Promise((e,t)=>{i.onload=function(){e(!0),console.log("ali")}})}function C(){return document.querySelectorAll(`a[alis-lb=${f}]`)[m].getAttribute("href")}function M(){return document.querySelectorAll(`a[alis-lb=${f}]`)[m].getAttribute("alis-lb-title")}function O(){i.style.setProperty("--alisImgLeft","50%"),i.style.setProperty("--alisImgTop","50%")}function $(){k=1,A=0,j()}function j(){i.style.setProperty("--alisImgScale",k),i.style.setProperty("--alisImgRotate",A+"deg")}function R(){i.style.setProperty("--alisImgLeft",g),i.style.setProperty("--alisImgTop",b)}function q(){$(),P(i),S(L),p-1==m?m=0:m++,y=C(),v=M(),D(),T().then(()=>{S(i),P(L),O()})}function V(){$(),P(i),S(L),0==m?m=p-1:m--,y=C(),v=M(),D(),T().then(()=>{S(i),P(L),O()})}function _(){event.preventDefault?event.preventDefault():event.returnValue=!1,k+=.2,j()}function X(){event.preventDefault?event.preventDefault():event.returnValue=!1,k<=.4?k=.2:k-=.2,j()}O(),w?i.addEventListener("touchstart",e=>{e.preventDefault?e.preventDefault():e.returnValue=!1;var t=e.touches[0].pageX-e.touches[0].target.offsetLeft,n=e.touches[0].pageY-e.touches[0].target.offsetTop;i.addEventListener("touchmove",e=>{let a=parseInt(e.touches[0].pageX),i=parseInt(e.touches[0].pageY);g=`${a-t}px`,b=`${i-n}px`,R()}),i.addEventListener("touchend",e=>{i.onmousemove=()=>{}})}):i.addEventListener("mousedown",e=>{var t=e.pageX-e.target.offsetLeft,n=e.pageY-e.target.offsetTop;i.onmousemove=e=>{let a=parseInt(e.pageX),i=parseInt(e.pageY);g=`${a-t}px`,b=`${i-n}px`,R()},i.addEventListener("mouseup",e=>{i.onmousemove=()=>{}})}),I.forEach(e=>[e.addEventListener("click",e=>{e.preventDefault?e.preventDefault():e.returnValue=!1,function(e){a.style.display="block",S(L),y=e.getAttribute("href"),f=e.getAttribute("alis-lb"),m=parseInt(e.getAttribute("alisIndex")),p=document.querySelectorAll(`a[alis-lb=${f}]`).length,v=e.getAttribute("alis-lb-title"),D(),T().then(()=>{S(i),P(L)})}(e.currentTarget)})]),a.addEventListener("click",e=>{"DIV"==e.target.tagName&&(P(i),y="",v="",$(),O(),a.style.display="none")}),r.addEventListener("click",()=>{q()}),s.addEventListener("click",()=>{V()}),d.addEventListener("click",()=>{_()}),u.addEventListener("click",()=>{X()}),l.addEventListener("click",()=>{A-=90,j()}),o.addEventListener("click",()=>{A+=90,j()}),document.body.addEventListener("keydown",e=>{37==e.keyCode?V():39==e.keyCode?q():38==e.keyCode?"block"!=a.style.display||_():40==e.keyCode&&"block"==a.style.display&&X()})}]);