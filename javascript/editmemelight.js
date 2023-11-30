
window.onload = function(){
    fetch('/editmemelight.php?getImage=true')
    .then(function (response) {
            console.log("got here with response ...");
            return response.text();
     })
   .then(result =>  { 
    console.log (result);
    doCanvasStuff(result);
    })


    function doCanvasStuff(imageFile){
        const myCanvas = document.getElementById('canvas');
        myCanvas.width=375;
        myCanvas.height=700; 
        const myContext = myCanvas.getContext('2d');
        myContext.fillRect(0,0,myCanvas.width,myCanvas.height); 

        document.querySelector("#nextStep").addEventListener("click",uploadChangedImage)
       
        const img = new Image();  
        img.src = "memes/"+imageFile;
        img.onload = () => {  
        document.querySelector("#canvas").style.width = img.width+"px";
        document.querySelector("#canvas").style.height = img.height+"px";
        myCanvas.width=img.width;
        myCanvas.height=img.height; 
        myContext.drawImage(img,img.width/1000,img.height/1000);   
            
        //Edit the meme...
        var drawing = false;
        var textMode = false;
        var textPosition = { x: 0, y: 0 }; // Initialize text position
    
        myCanvas.addEventListener('mousedown', startDrawing);
        myCanvas.addEventListener('mousemove', draw);
        myCanvas.addEventListener('mouseup', stopDrawing);
        myCanvas.addEventListener('mouseout', stopDrawing);
    
        // Add a click event listener to the toggleMode button
        var toggleModeButton = document.getElementById('toggleMode');
        toggleModeButton.addEventListener('click', toggleMode);
    
        // Add a keydown event listener to handle text input
        document.addEventListener('keydown', handleText);    
    
        // Color picker
        var colorPicker = document.getElementById('colorPicker');
        var colorBox = document.getElementById('colorBox');
        colorBox.style.backgroundColor = colorPicker.value;
        var currentColor = colorPicker.value;
        myContext.strokeStyle = currentColor;
        colorPicker.addEventListener('input', function () {
            currentColor = colorPicker.value;
            myContext.strokeStyle = currentColor;
        });
    
    // Add a drawText function to draw text on the canvas
    function drawText(text, x, y) {
        myContext.font = '20px Helvetica'; // Set the font style
        myContext.fillStyle = currentColor;
        // context.fillStyle = 'white'; // Set the text color
        myContext.fillText(text, x, y);
    }
    
    function handleText(e) {
        if (textMode && e.key.length === 1) {
            // Only handle single-character key presses
            var text = e.key;
            drawText(text, textPosition.x, textPosition.y);
    
            // Update text position for the next character
            textPosition.x += myContext.measureText(text).width;
        }
    }
    
        function startDrawing(e) {
            if (textMode) {
                // Handle text input logic
                console.log(e);
                let canvasRect = document.getElementById("canvas").getBoundingClientRect()        
                var scaleX = myCanvas.width / canvasRect.width;
                var scaleY = myCanvas.height / canvasRect.height;
        
                let newx = (e.clientX - canvasRect.left) * scaleX;
                var newy = (e.clientY - canvasRect.top) * scaleY;
                textPosition = {
                    x: newx,
                    y: newy,
                };
                console.log(canvasRect.x);
                console.log(e.clientX);
                var text = ''; // Initialize an empty string for text input
                drawText(text, textPosition.x, textPosition.y);
            } else {
                // Handle drawing logic
                drawing = true;
                draw(e);
            }
        }
               
        function draw(e) {
            if (!drawing) return;
    
            var rect = myCanvas.getBoundingClientRect();
            var scaleX = myCanvas.width / rect.width;
            var scaleY = myCanvas.height / rect.height;
    
            var x = (e.clientX - rect.left) * scaleX;
            var y = (e.clientY - rect.top) * scaleY;
    
            // Customize the drawing style (e.g., color, line width)
            myContext.lineWidth = 10;
            myContext.lineJoin = 'round';
            myContext.lineCap = 'round';
    
            // Set the drawing color
            myContext.strokeStyle = currentColor;
    
            // Draw a line
            myContext.lineTo(x, y);
            myContext.stroke();
            myContext.beginPath();
            myContext.moveTo(x, y);
        }
    
    
        function stopDrawing() {
            drawing = false;
            myContext.beginPath(); // Reset the path to start a new one when drawing is resumed
        }
    
        function toggleMode() {
            textMode = !textMode;
            if (textMode) {
                myCanvas.style.cursor = 'text';
            } else {
                myCanvas.style.cursor = 'pointer';
            }
        }
        
        function updateColorBox() {
            colorBox.style.backgroundColor = colorPicker.value;
        }
            
        colorPicker.addEventListener('input', function () {
            currentColor = colorPicker.value;
            myContext.strokeStyle = currentColor;
            updateColorBox(); // Call the updateColorBox function when the color changes
        });
         };

        function uploadChangedImage(){
        event.preventDefault();
        console.log("saveCanvas");
    
    // step 1: grab canvas data - put in an image container
      let canvas = document.getElementById('canvas');
      //console.log(canvas)
      let imgURL= canvas.toDataURL("image/png") ;
      let nameofimage = imageFile;

    let data = new FormData();
    data.append("p5CanvasImage",imgURL);
    data.append("nameofImage",nameofimage);
     //upload

     fetch('/editmemelight.php', {
    method: 'POST',
    body: data
    })
    
    .then(function (response) {
            console.log("got here with response ...");
            return response.text();
     })
   .then(result => {
        
      console.log(result);
      location.href ="testgallerylight.php";
    })
    .catch(error => {
    console.error('Error:', error);
    });
    }
 }
} //onload
