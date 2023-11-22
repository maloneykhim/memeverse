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
