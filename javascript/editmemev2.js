document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var colorPicker = document.getElementById('colorPicker');
    var colorBox = document.getElementById('colorBox');

    // Initialize the color box with the default color
    colorBox.style.backgroundColor = colorPicker.value;

    var image = new Image();
    image.src = 'images/stitch.jpeg'; // Replace with the path to your high-resolution image

    var drawing = false;

    // Set initial drawing color from the color picker
    var currentColor = colorPicker.value;
    context.strokeStyle = currentColor;

    // Event listener for color changes
    colorPicker.addEventListener('input', function() {
        currentColor = colorPicker.value;
        context.strokeStyle = currentColor;
    });

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    colorPicker.addEventListener('input', updateColorBox);

    // Load the high-resolution image before starting
    image.onload = function() {
        // Set canvas dimensions to match the image's natural size
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        // Draw the high-resolution image onto the canvas
        context.drawImage(image, 0, 0);
    };

    function startDrawing(e) {
        drawing = true;
        draw(e); // Start drawing from the current mouse position
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

    function updateColorBox() {
        colorBox.style.backgroundColor = colorPicker.value;
    }

});







