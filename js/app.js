/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section')
const navgList = document.querySelector("#navbar__list");
const navgbar = document.querySelector(".navbar");
const mainHero = document.querySelector(".main__hero");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildLinks = () => {
    for (let section of sections) {
      //name of navbar link
      const linkName = section.getAttribute("data-nav");
      //create and add the class to the navbar item node
      const navItem = document.createElement("li");
      navItem.classList.add("navbar__item");
      const navLink = document.createElement("a");
      navLink.classList.add("menu__link");
      navLink.textContent = linkName;
      navLink.setAttribute("href", `#${section.id}`);
      navItem.appendChild(navLink);
      navgList.appendChild(navItem);
    }
};

//style active link

// Add class 'active' to section when near top of viewport
const checkScrolling = ()=> {
  const scrollPosition = document.scrollingElement.scrollTop + 200;

  for (let section of sections){
    let id = section.id;

    if (scrollPosition >= mainHero.offsetHeight) {
      //only begin if user scrolled passed header
      if (section.offsetTop <= scrollPosition) {
        if (!document.querySelector(".active")) {
          sections[0].classList.add("active");
          document.querySelector(".navbar__item").classList.add("active-link");
        }
        document.querySelector(".active-link").classList.remove("active-link");
        document.querySelector(".active").classList.remove("active");
        document
          .querySelector(`a[href*=${id}]`)
          .parentElement.classList.add("active-link");
        document.querySelector(`#${id}`).classList.add("active");
      }
    }
    //code to remove all active states when the user is not on any section
    else {
      sections[0].classList.remove("active");
      document.querySelector(".navbar__item").classList.remove("active-link");
    }
  }
}

// Scroll to anchor ID using scrollTO event
//Go to top of the page when clicked
const scrollToTop = document.querySelector(".go__top");
scrollToTop.addEventListener("click", () => {
  document.querySelector("body").scrollIntoView({
    behavior: "smooth"
  });
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
window.addEventListener("DOMContentLoaded", () => {
  buildLinks();
});
// smooth Scroll to section on link click
const smoothScrolling = event => {
  event.preventDefault();
  document.querySelector(event.target.hash).scrollIntoView({
    behavior: "smooth"
  });
};
navgList.addEventListener("click", smoothScrolling);
// Set sections as active

window.addEventListener("scroll", () => {
  checkScrolling();
});
