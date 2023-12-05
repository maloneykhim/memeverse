<?php
 
session_start();

//if the image has been stored in the session var
if(isset($_SESSION["uploadedImage"])){
    //echo($_SESSION["uploadedImage"]);
$imagePath  = $_SESSION["uploadedImage"];

//request made by fetch
if($_SERVER['REQUEST_METHOD'] == 'GET'&& isset($_GET['getImage'])){
    //send back to js
    echo($imagePath);
    exit();
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
$upload_dir = "modifiedMemes/";
$imgName = $_POST['nameofImage'];
$description = $_POST["description"];
$img = $_POST['p5CanvasImage'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
//$file = $upload_dir . mktime() . ".png";
$file = $upload_dir.$imgName.".png";
//save to file...
$success = file_put_contents($file, $data);
//echo($upload_dir . mktime() . ".png");
echo($upload_dir . $imgName . ".png");
exit();
} 
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memeverse Prototype</title>
    <link rel="stylesheet" href="css/editmemev2.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>

    <div class = "top">
        <input type = "checkbox" id="darkmode-toggle"/>
        <label for = "darkmode-toggle" class="theme-toggle">
            <svg viewBox="0 0 75.99 75.99" class ="moon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 75.99 75.99" xml:space="preserve" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 37.9953,15.8314C 38.6152,15.8314 39.2291,15.8568 39.8361,15.9067C 32.123,20.2486 26.9133,28.5135 26.9133,37.9952C 26.9133,47.477 32.123,55.7419 39.8362,60.0838C 39.2291,60.1337 38.6152,60.1591 37.9953,60.1591C 25.7545,60.1591 15.8314,50.236 15.8314,37.9953C 15.8314,25.7545 25.7545,15.8314 37.9953,15.8314 Z "></path> </g></svg> 
        </label>
        <div class = "background"> 
            <div class="rectangle"></div>
        </div>
    </div>

    <div class="toolbar">
        <label for="colorPicker" class="color-picker">Color Picker :</label>
        <input type="color" id="colorPicker" value="#000000">
        <div class="color-box" id="colorBox"></div> <!-- Added color box -->

        <div id="textInputContainer" style="position: absolute; display: none;">
            <input type="text" id="textInput" placeholder="Type here">
        </div>

        
        <button id="toggleMode">Toggle Mode</button>
           
    </div>
        
    <div id="canvasContainer">
        <canvas id="canvas"></canvas>
    </div>

    <div class="mainWindowButtons">            
        <a href="beginlight.html"><button class="smallWindowButton no1">Back</button></a>
        <a href="testgallerylight.php"><button id="nextStep" class="smallWindowButton no2">Next</button></a>
    </div>

    <script src="javascript/editmemelight.js"></script>
</body>
</html>

<?php
}
else{
    echo("go away");
}

?>