<?php

if($_SERVER['REQUEST_METHOD'] == 'GET'&& isset($_GET['getImages'])){
    //send back to js

$imagePaths = scandir('modifiedMemes');

//var_dump($imagePaths);
echo(json_encode($imagePaths));
exit();
}
?>

<!DOCTYPE html>
<head>
<title> Output from the changed dir</title>
<style>

body {
    background-image: url("../images/backgroundgallerylight.png");
    background-size: 100%;
    overflow: hidden;
    font-family: 'Lexend', sans-serif;
}

    img{
        width:200px;
        height:auto;
    }
</style>
</head>
<body>
    <div id = "result">
    </div>

    <script>

window.onload = function(){
    fetch('/testgallerylight.php?getImages=true')
    .then(function (response) {
            console.log("got here with response ...");
            return response.json();
     })
   .then(result =>  { 
    console.log (result);
    displayImages(result);
})

function displayImages(result){
    let container = document.querySelector("#result");
    for(let i =2; i< result.length; i++){
        let image = document.createElement("img");
        if(result[i]!==".." || result[i]!="." )
        image.src  = "modifiedMemes/"+result[i];
        image.style.position = "absolute";
        image.style.top = Math.random()*300 +"px";
        image.style.left = Math.random()*300 +"px";
        container.appendChild(image);
        

    }

    
 }
}

        

     </script>
</body>

