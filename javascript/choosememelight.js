//Choose a meme from our gallery, edit it and then save it

window.onload = function(){
    fetch('/chooselight.php?getImages=true')
    .then(function (response) {
            console.log("got here with response ...");
            return response.json();
     })
   .then(result =>  { 
    console.log (result);
    displayImages(result);
})

function displayImages(result) {
    let container = document.querySelector("#galleryBox");

    let row = document.createElement("div");
    row.classList.add("galleryRow"); // Add the galleryRow class to the new row

    for (let i = 2; i < result.length; i++) {
        let image = document.createElement("img");

        if (result[i] !== ".." && result[i] !== ".") {
            image.src = "memes/" + result[i];
            row.appendChild(image);

            if (row.children.length === 3) {
                container.appendChild(row);
                row = document.createElement("div");
                row.classList.add("galleryRow");
            }

            image.addEventListener("click", selectImage);
        }
    }

    function selectImage() {
        console.log(this.src);
        let splitArray = this.src.split("/");

        fetch(`/chooselight.php?saveImage=${splitArray[splitArray.length - 1]}`)
            .then(function (response) {
                console.log("got here with response ...");
                return response.text();
            })
            .then(result => {
                console.log(result);
                // doCanvasStuff(result);
                location.href = "editmemelight.php";
            });
    }
}

}
