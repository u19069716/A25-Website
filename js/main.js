///////////////
// Functions //
///////////////

// Checks what page is currently being viewed, updates the navbar accordingly
// Also enables the hover animation on the nav-items
function InitNavItemIndicators(page, navItems) {
  // Check to see what page is being accessed
  var currentNavLinkID;
  switch (page) {
    case "index.html":
      currentNavLinkID = "nav-link-home";
      break;
    case "projects.html":
      currentNavLinkID = "nav-link-projects";
      break;
    case "store.html":
      currentNavLinkID = "nav-link-store";
      break;
    case "about-us.html":
      currentNavLinkID = "nav-link-about-us";
      break;
    case "contact-us.html":
      currentNavLinkID = "nav-link-contact-us";
      break;
    default:
      console.log(
        "ERROR: Did not match current page during initialization of nav-item indicators"
      );
      break;
  }

  // Set the matching nav-item indicator

  const currentNavLinkElement = document.getElementById(currentNavLinkID);
  currentNavLinkElement.style.setProperty(
    "--nav-item-selection-indicator-height",
    "15px"
  );

  // Iterate through all nav-items & add hover animation
  for (let index = 0; index < navItems.length; index++) {
    const navItem = navItems[index];
    if (navItem != currentNavLinkElement) {
      navItem.style.setProperty(
        "--nav-item-transition",
        "all cubic-bezier(0.19, 1, 0.165, 1) 0.5s"
      );
      navItem.addEventListener("mouseenter", () => {
        navItem.style.setProperty(
          "--nav-item-selection-indicator-height",
          "15px"
        );
      });
      navItem.addEventListener("mouseleave", () => {
        navItem.style.setProperty("--nav-item-selection-indicator-height", "0");
      });
    }
  }
}

// Removes a given class from an html element collection
function removeCSSClassFromHTMLElementCollection(elementCollection, cssClass) {
  for (let index = 0; index < elementCollection.length; index++) {
    const element = elementCollection[index];
    element.classList.remove(cssClass);
  }
}

// Sets the currently selected carousel content
function setSelectedCarouselContent(carouselContents, targetIndex) {
  removeCSSClassFromHTMLElementCollection(
    carouselContents,
    "carousel-content-selected"
  );
  carouselContents[targetIndex].classList.add("carousel-content-selected");
}

// Sets the currently selected inner carousel content
function setSelectedInnerCarouselContent(
  innerCarouselContents,
  indicators,
  targetIndex
) {
  removeCSSClassFromHTMLElementCollection(
    innerCarouselContents.children,
    "carousel-content-selected"
  );
  innerCarouselContents.children[targetIndex].classList.add(
    "carousel-content-selected"
  );

  removeCSSClassFromHTMLElementCollection(
    indicators,
    "carousel-content-inner-indicator-selected"
  );

  indicators[targetIndex].classList.add(
    "carousel-content-inner-indicator-selected"
  );
}

// Initializes interactivity with carousels & inner carousels
function InitCarousels(carousels) {
  for (let i = 0; i < carousels.length; i++) {
    const carousel = carousels[i];
    const carouselNavBar = carousel.children[0];
    const carouselContentContainer = carousel.children[1];
    for (let j = 0; j < carouselNavBar.children.length; j++) {
      const carouselNavItem = carouselNavBar.children[j];
      carouselContentContainer.children[j].style.setProperty(
        "--carousel-content-transition",
        "all cubic-bezier(0.19, 1, 0.165, 1) 0.8s"
      );
      carouselNavItem.addEventListener("click", () => {
        setSelectedCarouselContent(carouselContentContainer.children, j);
      });
      if (
        carouselContentContainer.children[j].classList.contains(
          "carousel-content-large"
        )
      ) {
        const carouselInnerContentContainer =
          carouselContentContainer.children[j].children[0];
        const carouselInnerIndicatorContainer =
          carouselContentContainer.children[j].children[1];
        for (
          let k = 0;
          k < carouselInnerIndicatorContainer.children.length;
          k++
        ) {
          const innerIndicator = carouselInnerIndicatorContainer.children[k];
          carouselInnerContentContainer.children[k].style.setProperty(
            "--carousel-content-transition",
            "all cubic-bezier(0.19, 1, 0.165, 1) 0.5s"
          );
          innerIndicator.addEventListener("click", () => {
            setSelectedInnerCarouselContent(
              carouselInnerContentContainer,
              carouselInnerIndicatorContainer.children,
              k
            );
          });
        }
      }
    }
  }
}

function initInnerCarousels(innerCarousels) {}

/////////////////////
// Main Entrypoint //
/////////////////////

window.onload = () => {
  // Store the name of the currently viewed page
  const page = window.location.pathname.split("/").pop();

  // Retrieve all nav-items
  const navItems = document.getElementsByClassName("nav-item");

  // Retrieve all carousels
  const carousels = document.getElementsByClassName("carousel");

  // Initialize nav-item indicators
  InitNavItemIndicators(page, navItems);

  // Initialize carousels
  InitCarousels(carousels);

  // Add an event listener to show/hide the trailer at the correct time
  document.getElementById("trailer-section").addEventListener("click", () => {
    setTimeout(() => {
      document.getElementById("trailer").style.display = "block";
    }, 500);
  });
  document.getElementById("movie-description").addEventListener("click", () => {
    document.getElementById("trailer").style.display = "none";
  });
};
