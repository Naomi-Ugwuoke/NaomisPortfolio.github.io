document.addEventListener("DOMContentLoaded", () => {
  // ===== Music Toggle =====
  const musicBtn = document.getElementById("musicBtn");
  const bgMusic = document.getElementById("bgMusic");
  let isPlaying = false;

  // Save time when pausing or before leaving
bgMusic.addEventListener("timeupdate", () => {
  localStorage.setItem("musicTime", bgMusic.currentTime);
});

// Restore position and play if previously playing
window.addEventListener("load", () => {
  const savedTime = localStorage.getItem("musicTime");
  if (savedTime) {
    bgMusic.currentTime = parseFloat(savedTime);
  }

  if (localStorage.getItem("musicPlaying") === "true") {
    bgMusic.play();
    musicBtn.textContent = "⏸ Pause Music";
  }
});

  musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
      bgMusic.play();
      musicBtn.textContent = "🔇 Pause Music";
    } else {
      bgMusic.pause();
      musicBtn.textContent = "🎵 Play Music";
    }
    isPlaying = !isPlaying;
  });

  // Try autoplay on load
  bgMusic
    .play()
    .then(() => {
      isPlaying = true;
      musicBtn.textContent = "🔇 Pause Music";
    })
    .catch(() => {
      // Autoplay blocked – wait for user interaction
      const tryPlay = () => {
        bgMusic.play().then(() => {
          isPlaying = true;
          musicBtn.textContent = "🔇 Pause Music";
        });
        document.body.removeEventListener("click", tryPlay);
      };

      document.body.addEventListener("click", tryPlay);
    });

  // ===== Section Scroll Reveal =====
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(".page").forEach((section) => {
    observer.observe(section);
  });

  // ===== Scroll Spy =====
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
