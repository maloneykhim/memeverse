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
  