// Version 1

//     document.addEventListener('DOMContentLoaded', function() {
//     var canvas = document.getElementById('canvas');
//     var context = canvas.getContext('2d');

//     var colorPicker = document.getElementById('colorPicker');
//     var colorBox = document.getElementById('colorBox');

//     var lineWidthInput = document.getElementById('lineWidth');

//     // Initialize the color box with the default color
//     colorBox.style.backgroundColor = colorPicker.value;

//     var image = new Image();
//     image.src = 'images/stitch.jpeg'; // Replace with the path to your high-resolution image

//     var drawing = false;

//     // Set initial drawing color from the color picker
//     var currentColor = colorPicker.value;
//     context.strokeStyle = currentColor;

//     // Event listener for color changes
//     colorPicker.addEventListener('input', function() {
//         currentColor = colorPicker.value;
//         context.strokeStyle = currentColor;
//     });

//     canvas.addEventListener('mousedown', startDrawing);
//     canvas.addEventListener('mousemove', draw);
//     canvas.addEventListener('mouseup', stopDrawing);
//     canvas.addEventListener('mouseout', stopDrawing);
//     colorPicker.addEventListener('input', updateColorBox);
//     lineWidthInput.addEventListener('input', updateLineWidth);


//     // Load the high-resolution image before starting
//     image.onload = function() {
//         // Set canvas dimensions to match the image's natural size
//         canvas.width = image.naturalWidth;
//         canvas.height = image.naturalHeight;

//         // Draw the high-resolution image onto the canvas
//         context.drawImage(image, 0, 0);
//     };

//     function startDrawing(e) {
//         drawing = true;
//         draw(e); // Start drawing from the current mouse position
//     }

//     function draw(e) {
//          if (!drawing) return;
      
//          var rect = canvas.getBoundingClientRect();
//          var scaleX = canvas.width / rect.width;
//          var scaleY = canvas.height / rect.height;
      
//          var x = (e.clientX - rect.left) * scaleX;
//          var y = (e.clientY - rect.top) * scaleY;
      
//          // Customize the drawing style (e.g., color, line width)
//         //  context.lineWidth = 10;
//          context.lineJoin = 'round';
//          context.lineCap = 'round';

//         // Set the drawing color
//         context.strokeStyle = currentColor;
//         context.lineWidth = lineWidthInput.value;

      
//          // Draw a line
//          context.lineTo(x, y);
//          context.stroke();
//          context.beginPath();
//          context.moveTo(x, y);
// }

//     function stopDrawing() {
//         drawing = false;
//         context.beginPath(); // Reset the path to start a new one when drawing is resumed
//     }

//     function updateColorBox() {
//         colorBox.style.backgroundColor = colorPicker.value;
//     }

//     function updateLineWidth() {
//         // Display the current line width in a label if needed
//         // var lineWidthLabel = document.getElementById('lineWidthLabel');
//         // lineWidthLabel.textContent = 'Line Width: ' + lineWidthInput.value;
//     }

    


// });











//Version 2

// document.addEventListener('DOMContentLoaded', function() {
//     var canvas = document.getElementById('canvas');
//     var context = canvas.getContext('2d');
//     var image = new Image();
//     image.src = 'images/stitch.jpeg'; // Replace with the correct path to your image

//     var drawing = false;
//     var textMode = false;

//     canvas.addEventListener('mousedown', startDrawing);
//     canvas.addEventListener('mousemove', draw);
//     canvas.addEventListener('mouseup', stopDrawing);
//     canvas.addEventListener('mouseout', stopDrawing);

//     // Add a click event listener to the toggleMode button
//     var toggleModeButton = document.getElementById('toggleMode');
//     toggleModeButton.addEventListener('click', toggleMode);

//     // Color picker
//     var colorPicker = document.getElementById('colorPicker');
//     var colorBox = document.getElementById('colorBox');
//     var lineWidthInput = document.getElementById('lineWidth');

//     colorBox.style.backgroundColor = colorPicker.value;
//     var currentColor = colorPicker.value;
//     context.strokeStyle = currentColor;

//     colorPicker.addEventListener('input', function() {
//         currentColor = colorPicker.value;
//         context.strokeStyle = currentColor;
//     });

//     // Load the image before starting
//     image.onload = function() {
//         // Set canvas dimensions to match the image's natural size
//         canvas.width = image.naturalWidth;
//         canvas.height = image.naturalHeight;
//         // Draw the high-resolution image onto the canvas
//         context.drawImage(image, 0, 0);
//     };

//     function startDrawing(e) {
//         if (textMode) {
//             var rect = canvas.getBoundingClientRect();
//             var x = e.clientX - rect.left;
//             var y = e.clientY - rect.top;

//             var text = prompt('Enter your text:');
//             if (text !== null) {
//                 context.font = '20px Helvetica';
//                 context.fillStyle = 'white';
//                 context.fillText(text, x, y);
//             }
//         } else {
//             drawing = true;
//             draw(e);
//         }
//     }

//     function draw(e) {
//         if (!drawing) return;

//         var rect = canvas.getBoundingClientRect();
//         var scaleX = canvas.width / rect.width;
//         var scaleY = canvas.height / rect.height;

//         var x = (e.clientX - rect.left) * scaleX;
//         var y = (e.clientY - rect.top) * scaleY;

//         context.lineWidth = lineWidthInput.value;
//         context.lineJoin = 'round';
//         context.lineCap = 'round';

//         context.lineTo(x, y);
//         context.stroke();
//         context.beginPath();
//         context.moveTo(x, y);
//     }

//     function stopDrawing() {
//         drawing = false;
//         context.beginPath();
//     }

//     function toggleMode() {
//         textMode = !textMode;
//         if (textMode) {
//             canvas.style.cursor = 'text';
//         } else {
//             canvas.style.cursor = 'pointer';
//         }
//     }
// });


// Version 3

document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var image = new Image();
    image.src = 'images/stitch.jpeg'; // Replace with the path to your high-resolution image

    var drawing = false;
    var textMode = false;
    var textPosition = { x: 0, y: 0 }; // Initialize text position

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Add a click event listener to the toggleMode button
    var toggleModeButton = document.getElementById('toggleMode');
    toggleModeButton.addEventListener('click', toggleMode);

    // Add a keydown event listener to handle text input
    document.addEventListener('keydown', handleText);

    // Rest of your code...

    // Load the high-resolution image before starting
    image.onload = function () {
        // Set canvas dimensions to match the image's natural size
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        // Draw the high-resolution image onto the canvas
        context.drawImage(image, 0, 0);
    };

    // Color picker
    var colorPicker = document.getElementById('colorPicker');
    var colorBox = document.getElementById('colorBox');
    colorBox.style.backgroundColor = colorPicker.value;
    var currentColor = colorPicker.value;
    context.strokeStyle = currentColor;
    colorPicker.addEventListener('input', function () {
        currentColor = colorPicker.value;
        context.strokeStyle = currentColor;
    });

// Add a drawText function to draw text on the canvas
function drawText(text, x, y) {
    context.font = '20px Helvetica'; // Set the font style
    context.fillStyle = currentColor;
    // context.fillStyle = 'white'; // Set the text color
    context.fillText(text, x, y);
}

function handleText(e) {
    if (textMode && e.key.length === 1) {
        // Only handle single-character key presses
        var text = e.key;
        drawText(text, textPosition.x, textPosition.y);

        // Update text position for the next character
        textPosition.x += context.measureText(text).width;
    }
}

    function startDrawing(e) {
        if (textMode) {
            // Handle text input logic
            console.log(e);
            let canvasRect = document.getElementById("canvas").getBoundingClientRect()        
            var scaleX = canvas.width / canvasRect.width;
            var scaleY = canvas.height / canvasRect.height;
    
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

        var rect = canvas.getBoundingClientRect();
        var scaleX = canvas.width / rect.width;
        var scaleY = canvas.height / rect.height;

        var x = (e.clientX - rect.left) * scaleX;
        var y = (e.clientY - rect.top) * scaleY;

        // Customize the drawing style (e.g., color, line width)
        context.lineWidth = 10;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        // Set the drawing color
        context.strokeStyle = currentColor;

        // Draw a line
        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
    }


    function stopDrawing() {
        drawing = false;
        context.beginPath(); // Reset the path to start a new one when drawing is resumed
    }

    function toggleMode() {
        textMode = !textMode;
        if (textMode) {
            canvas.style.cursor = 'text';
        } else {
            canvas.style.cursor = 'pointer';
        }
    }

    // Add a click event listener to the saveAndNext button
    var saveAndNextButton = document.getElementById('saveAndNext');
    saveAndNextButton.addEventListener('click', saveAndNext);

    // Function to handle save and redirect
    function saveAndNext() {
        // Convert the canvas content to a data URL
        var imageDataUrl = canvas.toDataURL();

        // Save the data URL to localStorage (you can also use other methods to store it)
        localStorage.setItem('modifiedImageDataUrl', imageDataUrl);

        // Redirect to the new page
        window.location.href = 'newPage.html'; // Replace 'newPage.html' with your actual new page URL
    }


});
