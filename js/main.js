///////////////
// Functions //
///////////////

function removeCSSClassFromHTMLElementCollection(elementCollection, cssClass) {
  for (let index = 0; index < elementCollection.length; index++) {
    const element = elementCollection[index];
    element.classList.remove(cssClass);
  }
}

function setSelectedHomepageItem(
  homepageItems,
  homepageContentItems,
  homepageItemIndex
) {
  removeCSSClassFromHTMLElementCollection(
    homepageItems,
    "homepage-item-selected"
  );
  removeCSSClassFromHTMLElementCollection(
    homepageContentItems,
    "homepage-content-item-selected"
  );
  for (let index = 0; index < homepageContentItems.length; index++) {
    if (index === homepageItemIndex) {
      const element = homepageContentItems[index];
      element.classList.add("homepage-content-item-selected");
    }
  }
  for (let index = 0; index < homepageItems.length; index++) {
    if (index === homepageItemIndex) {
      const element = homepageItems[index];
      element.classList.add("homepage-item-selected");
    }
  }
}

function setSelectedProject(projects, projectNavItems, projectIndex) {
  removeCSSClassFromHTMLElementCollection(projects, "project-selected");
  removeCSSClassFromHTMLElementCollection(
    projectNavItems,
    "projects-nav-item-selected"
  );
  projectNavItems[projectIndex].classList.add("projects-nav-item-selected");

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

  // Check what page has called this javascript
  const page = window.location.pathname.split("/").pop();

  // Collect interactive HTML elements
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");
  const homeNavLink = document.getElementById("home-navlink");
  const projectsNavLink = document.getElementById("projects-navlink");
  const merchandiseNavLink = document.getElementById("merchandise-navlink");
  const contactUsNavLink = document.getElementById("contact-us-navlink");
  const projectsNavItems = document.getElementsByClassName("projects-nav-item");
  const projects = document.getElementsByClassName("project");
  const products = document.getElementsByClassName("productDiv");
  const homepageItems = document.getElementsByClassName("homepage-item");
  const homepageContentItems = document.getElementsByClassName(
    "homepage-content-item"
  );

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
    window.location.href = "about-us.html";
  });

  // Check what page this javascript is getting called from
  if (page === "projects.html") {
    // Set selected project to first project
    setSelectedProject(projects, projectsNavItems, 0);

    // Iterate over all projects nav items & add event listener to allow selection of nav items
    for (let index = 0; index < projectsNavItems.length; index++) {
      const projectNavItem = projectsNavItems[index];
      projectNavItem.addEventListener("click", (event) => {
        setSelectedProject(projects, projectsNavItems, index);
        if (event.target.tagName === "LI") {
          event.target.classList.add("projects-nav-item-selected");
        } else {
          event.target.parentElement.classList.add(
            "projects-nav-item-selected"
          );
        }
      });
    }
  } else if (page === "store.html") {
    // Randomize amount that products in the store rotate when hovered
    let neg = -1;
    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      const randomDeg = 3 * Math.ceil(Math.random() * 3) * neg;
      neg *= -1;
      product.addEventListener("mouseenter", (event) => {
        event.target.style.transform =
          "rotate(" + randomDeg + "deg) translateY(-20px)";
      });
      product.addEventListener("mouseleave", (event) => {
        event.target.style.transform = "rotate(0deg) translateY(0)";
      });
    }
  } else if (page == "index.html") {
    // Enable continuous scroll through homepage items
    let intervalIndex = 0;
    setSelectedHomepageItem(homepageItems, homepageContentItems, intervalIndex);
    let homepageInterval = setInterval(() => {
      if (intervalIndex == homepageItems.length - 1) {
        intervalIndex = 0;
      } else {
        intervalIndex++;
      }
      setSelectedHomepageItem(
        homepageItems,
        homepageContentItems,
        intervalIndex
      );
    }, 5000);

    // Iterate over homepage items and add event listeners to enable selection of homepage items
    for (let index = 0; index < homepageItems.length; index++) {
      const element = homepageItems[index];
      element.addEventListener("click", (event) => {
        clearInterval(homepageInterval);
        // Reset continuous scroll counter everytime an item is selected
        homepageInterval = setInterval(() => {
          if (intervalIndex == homepageItems.length - 1) {
            intervalIndex = 0;
          } else {
            intervalIndex++;
          }
          setSelectedHomepageItem(
            homepageItems,
            homepageContentItems,
            intervalIndex
          );
        }, 5000);
        intervalIndex = index;
        setSelectedHomepageItem(homepageItems, homepageContentItems, index);
      });
    }
  }
};
