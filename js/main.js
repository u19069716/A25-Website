window.onload = () => {
  console.log("Javascript loaded");

  // Collect interactive HTML elements
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");
  const homeNavLink = document.getElementById("home-navlink");
  const projectsNavLink = document.getElementById("projects-navlink");
  const merchandiseNavLink = document.getElementById("merchandise-navlink");
  const contactUsNavLink = document.getElementById("contact-us-navlink");

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
};
