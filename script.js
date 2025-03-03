document.addEventListener("DOMContentLoaded", function() {
  let clickCount = 0;
  const boxImg = document.getElementById("box");
  const bagImg = document.getElementById("bag");
  const babyImg = document.getElementById("baby");
  const messageDiv = document.getElementById("message");

  
  const shakeSound = document.getElementById("shakeSound");
  const tearSound = document.getElementById("tearSound");
  const appearSound = document.getElementById("appearSound");

  
  let startX = 0;
  let isDragging = false;
  const swipeThreshold = 50; 

  function updateMessage(text) {
    messageDiv.textContent = text;
    messageDiv.style.opacity = 0;
    messageDiv.style.animation = "none";
    void messageDiv.offsetWidth;
    messageDiv.style.animation = "fadeIn 1s forwards";
  }

  
  boxImg.addEventListener("click", function() {
    clickCount++;
    if (clickCount < 3) {
      boxImg.classList.add("shake");
      shakeSound.currentTime = 0; 
      shakeSound.play();
      updateMessage(`Bạn đã nhấp ${clickCount} lần. Nhấp đủ 3 lần để mở hộp!`);
      setTimeout(() => {
        boxImg.classList.remove("shake");
      }, 500);
    } else if (clickCount === 3) {
      boxImg.classList.add("slide-out");
      updateMessage("Hộp đang mở...");
      setTimeout(() => {
        boxImg.style.display = "none";
        bagImg.style.display = "block";
        updateMessage("Xé túi đi nào!");
      }, 800);
    }
  });

  
  function tearBag() {
    bagImg.classList.add("tear");
    updateMessage("Đang xé túi mù...");
    tearSound.currentTime = 0;
    tearSound.play();
    
    setTimeout(() => {
      bagImg.classList.remove("tear");
      bagImg.style.display = "none";
      babyImg.src = "10.png";
      babyImg.style.display = "block";
      babyImg.classList.add("sparkle");
      appearSound.currentTime = 0;
      appearSound.play();
      setTimeout(() => {
        babyImg.classList.remove("sparkle");
      }, 1000);
      updateMessage("Trúng Secret roii! Omedetou");
    }, 2500);
  }

  bagImg.addEventListener("mousedown", function(e) {
    startX = e.clientX;
    isDragging = true;
  });

  document.addEventListener("mouseup", function(e) {
    if (!isDragging) return;
    isDragging = false;
    let diffX = e.clientX - startX;
    if (Math.abs(diffX) > swipeThreshold) {
      tearBag();
    }
  });

  
  bagImg.addEventListener("touchstart", function(e) {
    const touch = e.touches[0];
    startX = touch.clientX;
    isDragging = true;
  }, false);

  bagImg.addEventListener("touchend", function(e) {
    if (!isDragging) return;
    isDragging = false;
    const touch = e.changedTouches[0];
    let diffX = touch.clientX - startX;
    if (Math.abs(diffX) > swipeThreshold) {
      tearBag();
    }
  }, false);

  
  babyImg.addEventListener("click", function() {
    window.location.href = "https://zuminnn.github.io/Wheel/";
  });
});
