document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".img");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const message = document.getElementById("h");
  const resultMessage = document.getElementById("para");
  let selectedImages = [];
  let imagesLoaded = 0;

  // Ensure images are fully loaded before running tests
  function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === images.length) {
      console.log("All images loaded");
    }
  }

  // Attach imageLoaded function dynamically
  images.forEach((img) => {
    img.addEventListener("load", imageLoaded);
  });

  // Shuffle images
  function shuffleImages() {
    let parent = document.querySelector(".flex");
    let children = Array.from(parent.children);
    children.sort(() => Math.random() - 0.5);
    children.forEach((child) => parent.appendChild(child));
  }

  shuffleImages();

  // Click on an image handler
  images.forEach((img) => {
    img.addEventListener("click", () => {
      if (selectedImages.length < 2 && !selectedImages.includes(img)) {
        img.classList.add("selected");
        selectedImages.push(img);

        if (selectedImages.length === 1) {
          resetButton.style.display = "inline-block";
        }

        if (selectedImages.length === 2) {
          verifyButton.style.display = "inline-block";
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
    if (selectedImages.length === 2 && selectedImages[0].dataset.id === selectedImages[1].dataset.id) {
      resultMessage.textContent = "You are a human. Congratulations!";
    } else {
      resultMessage.textContent = "We can't verify you as a human. You selected non-identical tiles.";
    }
    verifyButton.style.display = "none";
  });
});
