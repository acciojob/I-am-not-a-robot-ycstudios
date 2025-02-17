document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".img");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const message = document.getElementById("h");
  const resultMessage = document.getElementById("para");
  let selectedImages = [];
  
  // Shuffle images function (will shuffle the images every time the page reloads)
  function shuffleImages() {
    let parent = document.querySelector(".flex");
    let children = Array.from(parent.children);
    children.sort(() => Math.random() - 0.5);
    children.forEach((child) => parent.appendChild(child));
  }

  shuffleImages(); // Shuffle images on page load

  // Click on an image handler
  images.forEach((img) => {
    img.addEventListener("click", () => {
      if (selectedImages.length < 2 && !selectedImages.includes(img)) {
        img.classList.add("selected");
        selectedImages.push(img);
        
        if (selectedImages.length === 1) {
          resetButton.style.display = "inline-block"; // Show reset button
        }
        
        if (selectedImages.length === 2) {
          verifyButton.style.display = "inline-block"; // Show verify button
        }
      }
    });
  });

  // Reset button functionality
  resetButton.addEventListener("click", () => {
    selectedImages.forEach((img) => img.classList.remove("selected"));
    selectedImages = [];
    message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
    resultMessage.textContent = "";
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
  });

  // Verify button functionality
  verifyButton.addEventListener("click", () => {
    if (selectedImages[0].dataset.id === selectedImages[1].dataset.id) {
      resultMessage.textContent = "You are a human. Congratulations!";
    } else {
      resultMessage.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyButton.style.display = "none"; // Hide verify button after checking
  });
});
