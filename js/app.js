document.addEventListener("DOMContentLoaded", () => {

  const splash = document.getElementById("splash");
  const enterBtn = document.getElementById("enter");

  const viewer = document.getElementById("viewer");
  const viewerImg = document.getElementById("viewer-img");
  const counter = document.getElementById("counter");

  const projects = {
    "on-seeing": 12,
    "in-passing": 12,
    "meanwhile": 12
  };

  let current = 1;
  let activeProject = null;

  // Enter site
  enterBtn.onclick = () => splash.remove();

  // Open a project
  document.querySelectorAll("[data-project]").forEach((link) => {
    link.onclick = (e) => {
      e.preventDefault();
      activeProject = link.dataset.project;
      current = 1;
      openImage();
    };
  });

  function openImage() {
    viewer.hidden = false;

    const filename = `${String(current).padStart(2, "0")}.jpg`;
    viewerImg.src = `images/${activeProject}/${filename}`;

    viewerImg.onerror = () => {
      counter.textContent = `Missing: images/${activeProject}/${filename}`;
    };

    counter.textContent = `${current} / ${projects[activeProject]}`;
  }

  viewer.onclick = () => {
    if (viewer.hidden) return;

    current += 1;

    if (current > projects[activeProject]) {
      viewer.hidden = true;
      return;
    }

    openImage();
  };

  window.onkeydown = (e) => {
    if (viewer.hidden) return;

    if (e.key === "Escape") {
      viewer.hidden = true;
      return;
    }

    if (["ArrowRight", "ArrowDown", "PageDown"].includes(e.key)) {
      current = Math.min(projects[activeProject], current + 1);
      openImage();
    }

    if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
      current = Math.max(1, current - 1);
      openImage();
    }
  };

});

// Subtle hover drift (pointer-based parallax) for cards
document.querySelectorAll(".card").forEach((card) => {
  const img = card.querySelector(".card-media img");
  if (!img) return;

  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;   // 0..1
    const py = (e.clientY - r.top) / r.height;   // 0..1

    // small, restrained drift
    const dx = (px - 0.5) * 10; // px
    const dy = (py - 0.5) * 6;  // px

    img.style.transform = `scale(1.08) translate(${dx}px, ${dy}px)`;
  });

  card.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1.03) translate(0px, 0px)";
  });
});
