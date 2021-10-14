///////////////
// Functions //
///////////////

function removeCSSClassFromHTMLElementCollection(elementCollection, cssClass) {
  for (let index = 0; index < elementCollection.length; index++) {
    const element = elementCollection[index];
    element.classList.remove(cssClass);
  }
}

function setSelectedProject(projectIndex) {
  const targetProject = document.getElementById(
    "project-" + (projectIndex + 1)
  );
  targetProject.classList.add("project-selected");
}

/////////////////////
// Main Entrypoint //
/////////////////////

window.onload = () => {
  console.log("Javascript loaded");

  // Collect interactive HTML elements
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");
  const homeNavLink = document.getElementById("home-navlink");
  const projectsNavLink = document.getElementById("projects-navlink");
  const merchandiseNavLink = document.getElementById("merchandise-navlink");
  const contactUsNavLink = document.getElementById("contact-us-navlink");
  const projectsNavItems = document.getElementsByClassName("projects-nav-item");
  const projects = document.getElementsByClassName("project");

  // Add event listener to menu button to display menu when clicked
  menuButton.addEventListener("click", () => {
    menu.classList.toggle("menu-visible");
  });

  // Add event listener to navlink items to navigate to the relevant urls when clicked
  homeNavLink.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  projectsNavLink.addEventListener("click", () => {
    window.location.href = "projects.html";
  });
  merchandiseNavLink.addEventListener("click", () => {
    window.location.href = "store.html";
  });
  contactUsNavLink.addEventListener("click", () => {
    window.location.href = "AboutUs.html";
  });

  // Set selected project to first project
  setSelectedProject(0);
  projectsNavItems[0].classList.add("projects-nav-item-selected");

  // Iterate over all projects nav items & add event listener to allow selection of nav items
  for (let index = 0; index < projectsNavItems.length; index++) {
    const projectNavItem = projectsNavItems[index];
    projectNavItem.addEventListener("click", (event) => {
      removeCSSClassFromHTMLElementCollection(
        projectsNavItems,
        "projects-nav-item-selected"
      );
      removeCSSClassFromHTMLElementCollection(projects, "project-selected");
      setSelectedProject(index);
      if (event.target.tagName === "LI") {
        event.target.classList.add("projects-nav-item-selected");
      } else {
        event.target.parentElement.classList.add("projects-nav-item-selected");
      }
    });
  }
};
