    //Add base elements
    var div = document.createElement('DIV');
    div.innerHTML = `
    <div id="alisMainContainer" class="alis-main-container">
    <div class="alis-row alisCloseIcon">
        X
    </div>
    <div class="alis-img-container text-center">
        <img id="alisMainImg" src="src/assets/sampleImage.jpg" alt="sampleimage" draggable=false>
    </div>
    <div class="alis-buttons-container">
    <div class="alis-row" style="justify-content: center">
    <h5 id="alisImageTitle" class="text-center" style="margin: 10px;">Name of the image.jpg</h5>
    </div>
    <div class="buttons-div alis-row text-center">
        <span class="alis-nav-btn" id="alisRotateLeftBtn"></span>
        <span class="alis-nav-btn" id="alisRotateRightBtn"></span>
        <span class="alis-nav-btn" id="alisPrevBtn"></span>
        <span class="alis-nav-btn" id="alisNextBtn"></span>
        <span class="alis-nav-btn" id="alisZoomInBtn"></span>
        <span class="alis-nav-btn" id="alisZoomOutBtn"></span>
    </div>
    </div>
    </div>`
    document.body.appendChild(div)