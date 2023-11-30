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
        if (window.location.href.includes("beginlight.html")) {
          // If currently on page1, navigate to page2
          window.location.href = "begindark.html";
        } else if (window.location.href.includes("begindark.html")) {
          // If currently on page2, navigate back to page1
          window.location.href = "beginlight.html";
        }
  
        isAnimating = false; // Reset the animation flag after the page change
      }, 1000); // Adjust the delay time (in milliseconds) as needed
    });
  });


 // Function to toggle popup visibility
function togglePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
}

// Click outside the popup to close it (except when the generator button is clicked)
document.addEventListener('click', function(event) {
  const popup = document.getElementById('popup');
  const icon = document.querySelector('.icon');
  const generateBtn = document.getElementById('generatePromptBtn');

  if (event.target !== popup && event.target !== icon && event.target !== generateBtn) {
      popup.style.display = 'none';
  }
});

document.getElementById('generatePromptBtn').addEventListener('click', () => {
  const popup = document.getElementById('popup');
  popup.style.display = 'block'; // Show the popup when the generator button is clicked

  // Fetch prompts from JSON file and generate a prompt
  fetch('prompts.json')
    .then(response => response.json())
    .then(data => {
      const prompts = data.prompts;
      const randomIndex = Math.floor(Math.random() * prompts.length);
      const randomPrompt = prompts[randomIndex];
      document.getElementById('promptDisplay').innerText = randomPrompt;
    })
    .catch(error => console.log(error));
});






