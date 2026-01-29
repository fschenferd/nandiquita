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
