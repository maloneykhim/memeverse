<?php

if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['getImages'])) {
    // Send back to JS
    $imagePaths = scandir('modifiedMemes');
    echo(json_encode($imagePaths));
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Output from the changed dir</title>
    <style>

label {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    height:70px;
    align-items:center ;
    display:flex;
    flex-direction: column;
    justify-content: center;
    background: linear-gradient(90deg,#f38a9f, #d8669041);
    border: 2px solid #ffffff;
    border-radius: 200px;
    cursor: pointer;
    transition: 0.3s;
    
}
  
label:after {
    content:"";
    width: 48px;
    height:48px;
    position: absolute;
    top:10px;
    left:10px;
    background: #DFFFFF;
    border: 2px solid #ffffff;
    border-radius: 180px;
    box-shadow: 0px 5px 10px rbga(0,0,0,0.2); 
    transition: 0.3s;
}

input {
    width:0;
    height:0;
    visibility: hidden;
}

input:checked + label {
    background:linear-gradient(90deg, #f38a9f, #d8669041) ;
}

input:checked + label:after{
    left: 170px;
    transform: translateX(-100%);
    background: transparent;
}

label:active:after{
    width:75px;
}

label svg{
    position:absolute;
    width:70px;
    top:0px;
    z-index:100;
}

label svg.moon{
    left: 110px;
    fill: #ffffff;
    transition:0.3s;
}

input:checked+ label svg.moon{
    fill: #ffffff;
}
   


    body {
    background-image: url("../images/backgroundgallerylight.png");
    background-size: 100%;
    overflow: hidden;
    font-family: 'Lexend', sans-serif;
    margin: 0;
}

.top {
    position: relative;
}

.gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
    max-width: 1200px; /* Set a max-width for the gallery */
    margin: 90px auto 0; /* Add margin to the top and center the gallery */
}

.gallery img {
    width: 200px;
    height: auto;
    margin: 10px;
    cursor: pointer;
    transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
    border-radius: 10px; /* Adjust the value for the desired roundness */
}

.gallery img:hover {
    transform: scale(1.2) translate(0, -5px);
    opacity: 0.8;
}



.lightbox {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    justify-content: center;
    align-items: center;
}

.lightbox img {
    max-width: 90%;
    max-height: 90%;
    border: 5px solid #fff;
    box-shadow: 0 0 25px #000;
    border-radius: 10px; /* Adjust the value for the desired roundness */
}

.close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
}
    </style>
</head>

<body>

<div class = "top">
        <input type = "checkbox" id="darkmode-toggle"/>
        <label for = "darkmode-toggle">
            <svg viewBox="0 0 75.99 75.99" class ="moon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 75.99 75.99" xml:space="preserve" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 37.9953,15.8314C 38.6152,15.8314 39.2291,15.8568 39.8361,15.9067C 32.123,20.2486 26.9133,28.5135 26.9133,37.9952C 26.9133,47.477 32.123,55.7419 39.8362,60.0838C 39.2291,60.1337 38.6152,60.1591 37.9953,60.1591C 25.7545,60.1591 15.8314,50.236 15.8314,37.9953C 15.8314,25.7545 25.7545,15.8314 37.9953,15.8314 Z "></path> </g></svg> 
        </label>
        <div class = "background"> 
            <div class="rectangle"></div>
        </div>
    </div>

    <img src="../images/homeicon.png" alt="Dark Mode Icon" class="icon">

    <div class="gallery" id="result"></div>

    <div class="lightbox" id="lightbox">
        <span class="close-btn" id="lightboxbtn">×</span>
        <a id="download-link" download><img id="lightbox-image"></a>
    </div>

    <script>

document.addEventListener("DOMContentLoaded", function () { 
    document.querySelector("#lightboxbtn").addEventListener("click",closeLightbox)
        const toggleButton = document.getElementById("darkmode-toggle");
        const body = document.body;
        let isAnimating = false;

        toggleButton.addEventListener("click", function () {
            if (isAnimating) {
                return; // If the animation is in progress, do nothing
            }

            isAnimating = true; 

            // Delay the background image change after the animation is complete
            setTimeout(function () {
                body.classList.toggle('night-mode'); // Toggle darkmode class
                updateBackgroundImage(); // Update background image based on dark mode state

                isAnimating = false; // Reset the animation
            }, 1000); // Adjust the delay time (in milliseconds) as needed
        });

        function updateBackgroundImage() {
            const backgroundImage = body.classList.contains('night-mode')
                ? 'url("../images/gallerydark.png")'
                : 'url("../images/backgroundgallerylight.png")';

            body.style.backgroundImage = backgroundImage;
        }
    });



    // window.onload = function () {
        fetch('/testgallerylight.php?getImages=true')
            .then(function (response) {
                console.log("got here with response ...");
                return response.json();
            })
            .then(result => {
                console.log(result);
                displayImages(result);
            });

        function displayImages(result) {
            let container = document.querySelector("#result");

            for (let i = 2; i < result.length; i++) {
                if (result[i] !== ".." && result[i] !== ".") {
                    let image = document.createElement("img");
                    image.src = "modifiedMemes/" + result[i];
                    image.onclick = function () {
                        openLightbox(image.src);
                        setDownloadLink(image.src);
                    };
                    container.appendChild(image);
                }
            }
         }

        function openLightbox(imageSrc) {
            let lightbox = document.getElementById("lightbox");
            let lightboxImage = document.getElementById("lightbox-image");
            lightboxImage.src = imageSrc;
            lightbox.style.display = "flex";
        }

        function closeLightbox() {
            let lightbox = document.getElementById("lightbox");
            let downloadLink = document.getElementById("download-link");

            // Reset the download link
            downloadLink.href = "#";

            lightbox.style.display = "none";
        }

        function setDownloadLink(imageSrc) {
            let downloadLink = document.getElementById("download-link");
            downloadLink.href = imageSrc;
        }

        // Scroll animation
        let scrollingImages = document.querySelector(".gallery");

        window.addEventListener('scroll', function () {
            let scrollValue = window.scrollY;
            scrollingImages.style.transform = `translateX(-${scrollValue}px)`;
        });
    //}
</script>
</body>
</html>
