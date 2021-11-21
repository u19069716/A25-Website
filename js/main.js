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
          carouselContentContainer.children[j].children[1];
        const carouselInnerIndicatorContainer =
          carouselContentContainer.children[j].children[2];
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

  if (page === "projects.html") {
    // Add an event listener to show/hide the trailer at the correct time
    document.getElementById("trailer-section").addEventListener("click", () => {
      setTimeout(() => {
        document.getElementById("trailer").style.display = "block";
      }, 500);
    });
    document
      .getElementById("movie-description")
      .addEventListener("click", () => {
        document.getElementById("trailer").style.display = "none";
      });
  } else if (page === "store.html") {
    // Add to cart interactivity
    const cartArea = document.getElementById("cart-area");
    const addToCartButtons = document.getElementsByClassName("add-to-cart");
    const cartTotalAmount = document.getElementById("cart-total-amount");
    const cartTotalItems = document.getElementById("cart-total-items");

    let addedToCart = false;

    for (let i = 0; i < addToCartButtons.length; i++) {
      const addToCartButton = addToCartButtons[i];
      addToCartButton.addEventListener("click", (event) => {
        const cartItem = document.createElement("div");
        const cartItemTitle = document.createElement("div");
        const cartItemSubtitle = document.createElement("div");
        const cartItemPrice = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItemTitle.classList.add("cart-item-title");
        cartItemTitle.innerText = event.target.dataset.title;
        console.log();
        cartItemSubtitle.classList.add("cart-item-subtitle");
        cartItemSubtitle.innerText = event.target.dataset.subtitle;
        cartItemPrice.classList.add("cart-item-price");
        cartItemPrice.innerText = "R999.99";
        cartItem.appendChild(cartItemTitle);
        cartItem.appendChild(cartItemSubtitle);
        cartItem.appendChild(cartItemPrice);
        if (
          cartArea.children[0].innerText === "You have no items in your cart :("
        ) {
          cartArea.removeChild(cartArea.children[0]);
          addedToCart = true;
        }
        cartArea.appendChild(cartItem);
        cartTotalAmount.innerText = "R" + cartArea.children.length * 999.9;
        cartTotalItems.innerText = cartArea.children.length + " Items";
      });
    }
    const checkoutButton = document.getElementById("checkout-button");
    const checkoutScreen = document.getElementById("checkout-screen");
    const checkoutAmount = document.getElementById("checkout-amount");
    const checkoutCount = document.getElementById("checkout-items-count");
    const checkoutSubmit = document.getElementById("submit-checkout");
    const checkoutCancel = document.getElementById("cancel-checkout");

    checkoutButton.addEventListener("click", () => {
      if (addedToCart) {
        checkoutScreen.style.display = "flex";
        checkoutAmount.innerText = "R" + cartArea.children.length * 999.9;
        checkoutCount.innerText = cartArea.children.length + " Items";
      } else {
        alert("Please add something to your cart before trying to check out!");
      }
    });

    checkoutSubmit.addEventListener("click", () => {
      checkoutScreen.style.display = "none";
      addedToCart = false;
      alert("Payment successful!");
      while (cartArea.children.length > 0) {
        var cartItem = cartArea.children[0];
        cartArea.removeChild(cartItem);
      }
      cartTotalAmount.innerText = "";
      cartTotalItems.innerText = "";
      const noItemText = document.createElement("p");
      noItemText.innerText = "You have no items in your cart :(";
      cartArea.appendChild(noItemText);
    });

    checkoutCancel.addEventListener("click", () => {
      checkoutScreen.style.display = "none";
    });
  } else if (page === "contact-us.html") {
    const submitButton = document.getElementById("contact-us-submit");
    const nameField = document.getElementById("contact-us-name");
    const emailField = document.getElementById("contact-us-email");
    const messageField = document.getElementById("contact-us-message");

    submitButton.addEventListener("click", () => {
      nameField.value = "";
      emailField.value = "";
      messageField.value = "";
      alert("Message Sent!");
    });
  }
};
