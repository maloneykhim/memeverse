document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("darkmode-toggle");
  let isAnimating = false; // Flag to track the animation state

  toggleButton.addEventListener("click", function () {
    if (isAnimating) {
      return; // If the animation is in progress, do nothing
    }

    isAnimating = true; // Set the animation flag

    // Delay the page change after the animation is complete
    setTimeout(function () {
      if (window.location.href.includes("editmemelight.html")) {
        // If currently on page1, navigate to page2
        window.location.href = "editmemedark.html";
      } else if (window.location.href.includes("editmemedark.html")) {
        // If currently on page2, navigate back to page1
        window.location.href = "editmemelight.html";
      }

      isAnimating = false; // Reset the animation flag after the page change
    }, 1000); // Adjust the delay time (in milliseconds) as needed
  });
});








document.addEventListener('DOMContentLoaded', function () {
  const imageContainer = document.querySelector('.image-container');
  const colorPicker = document.getElementById('colorPicker');
  const boldBtn = document.getElementById('boldBtn');
  const italicBtn = document.getElementById('italicBtn');
  const fontSizeRange = document.getElementById('fontSizeRange');
  const fontFamilySelect = document.getElementById('fontFamilySelect');

  function addTextInput(event) {
    const textInput = document.createElement('div');
    textInput.classList.add('text-input');
    textInput.contentEditable = 'true';
    textInput.style.left = event.clientX - imageContainer.getBoundingClientRect().left + 'px';
    textInput.style.top = event.clientY - imageContainer.getBoundingClientRect().top + 'px';
    imageContainer.appendChild(textInput);
    textInput.focus();

    // Apply styles on text input change
    textInput.addEventListener('input', () => {
      applyStyles(textInput);
    });

    // Make text draggable
    makeElementDraggable(textInput);
  }

  imageContainer.addEventListener('click', addTextInput);

  function applyStyles(element) {
    element.style.color = colorPicker.value;
    element.style.fontWeight = boldBtn.classList.contains('active') ? 'bold' : 'normal';
    element.style.fontStyle = italicBtn.classList.contains('active') ? 'italic' : 'normal';
    element.style.fontSize = `${fontSizeRange.value}px`;
    element.style.fontFamily = fontFamilySelect.value;
  }

  boldBtn.addEventListener('click', () => {
    boldBtn.classList.toggle('active');
    const activeElement = document.querySelector('.text-input:focus');
    if (activeElement) applyStyles(activeElement);
  });

  italicBtn.addEventListener('click', () => {
    italicBtn.classList.toggle('active');
    const activeElement = document.querySelector('.text-input:focus');
    if (activeElement) applyStyles(activeElement);
  });

  fontSizeRange.addEventListener('input', () => {
    const activeElement = document.querySelector('.text-input:focus');
    if (activeElement) applyStyles(activeElement);
  });

  fontFamilySelect.addEventListener('change', () => {
    const activeElement = document.querySelector('.text-input:focus');
    if (activeElement) applyStyles(activeElement);
  });

  function makeElementDraggable(element) {
    let isDragging = false;
    let initialX, initialY;

    element.addEventListener('mousedown', (e) => {
      isDragging = true;
      initialX = e.clientX - parseFloat(window.getComputedStyle(element).left);
      initialY = e.clientY - parseFloat(window.getComputedStyle(element).top);
    });

    element.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const newX = e.clientX - initialX;
        const newY = e.clientY - initialY;
        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;
      }
    });

    element.addEventListener('mouseup', () => {
      isDragging = false;
    });

    element.addEventListener('mouseleave', () => {
      isDragging = false;
    });
  }
});
