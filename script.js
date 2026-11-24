const projects = [
  {
    title: "Problem Solver",
    description: "A community Q&A platform where users share problems, collect solutions, and react to answers. Built with React, Express, and MongoDB, with authentication, search, category filters, and notifications.",
    tags: ["JavaScript"],
    link: "https://problem-solver-vert.vercel.app/"
  },
  {
    title: "Staybnb",
    description: "A full-stack Airbnb clone for listing, searching, and booking stays. Built with React, Node/Express, and MongoDB, with secure authentication and Cloudinary image uploads.",
    tags: ["JavaScript"],
    link: "https://airbnb-clone-ten-henna.vercel.app/"
  },
  {
    title: "Portfolio Website",
    description: "A responsive personal portfolio built with semantic HTML and CSS, with JavaScript-powered project cards and category filters.",
    tags: ["HTML/CSS", "JavaScript"],
    link: "#top"
  }
];

const projectCards = document.querySelector("#project-cards");
const filterButtons = document.querySelectorAll(".filter-button");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

function renderProjects(filter = "All") {
  const visibleProjects = filter === "All"
    ? projects
    : projects.filter((project) => project.tags.includes(filter));

  projectCards.innerHTML = visibleProjects.map((project) => `
    <a class="card" href="${project.link}"${project.link.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""} aria-label="Open ${project.title} project">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="card-tags" aria-label="Project technologies">
        ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </a>
  `).join("");

  // Track project clicks
  projectCards.querySelectorAll(".card").forEach((card, index) => {
    card.addEventListener("click", () => {
      const project = visibleProjects[index];

      if (typeof gtag === "function") {
        gtag("event", "project_click", {
          project_name: project.title
        });
      }
    });
  });
}
renderProjects();

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    renderProjects(button.dataset.filter);
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});


const githubLink = document.querySelector("#github-link");
const linkedinLink = document.querySelector("#linkedin-link");

if (githubLink) {
  githubLink.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "github_click");
    }
  });
}

if (linkedinLink) {
  linkedinLink.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "linkedin_click");
    }
  });
}