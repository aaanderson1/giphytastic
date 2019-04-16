var tags = ["redneck", "middle finger", "maury"];
function initialize() {
    var root = document.getElementById("root");
    root.innerHTML = '';
    var buttonRoot = document.createElement("div");
    root.appendChild(buttonRoot);
    for(var tag of tags) {
        var button = document.createElement("button");
        button.innerText = tag;
        buttonRoot.appendChild(button);
        const innerTag = tag;
        button.addEventListener("click", function(){
            queryGiphy(innerTag, loadImages);
        });
    }
}
initialize();
function queryGiphy(keyword,fulfillGiphy){
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    keyword + "&api_key=dc6zaTOxFJmzC&limit=10";
    var htmlRequest = new XMLHttpRequest();
    htmlRequest.onload = function() { 
        if(htmlRequest.response) {
            var object = JSON.parse(htmlRequest.response);
            fulfillGiphy(object.data);
        } else {
            console.log("error");
        }
    };
    htmlRequest.open("GET", queryURL, true);
    htmlRequest.send();
}
queryGiphy("redneck", function(results){
   console.log(results); 
});
function loadImages(imageDatas) {
    var root = document.getElementById("root");
    var imageRoot = document.getElementById("image-root");
    if(!imageRoot) {
        imageRoot = document.createElement("div");
        imageRoot.id = "image-root";
        root.appendChild(imageRoot);
    }
    imageRoot.innerHTML = '';
    for(var imageData of imageDatas) {
        var image = document.createElement("img");
        imageRoot.appendChild(image);
        image.src = imageData.images.fixed_height.url;

    }
}