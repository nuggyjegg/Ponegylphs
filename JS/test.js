/********************************************
 * SEARCH BAR INTERACTION
 ********************************************/
const searchInput = document.getElementById('searchInput');
const searchIcon = document.querySelector('.search-icon');

searchIcon.addEventListener('click', () => {
    searchInput.focus();
});

const monumentsList = document.getElementById("monumentsList");
const monuments = monumentsList.getElementsByTagName("li");

searchInput.addEventListener("focus", () => {
    monumentsList.style.display = "block";
});

document.addEventListener("click", function(e) {
    if (!document.querySelector(".search-box").contains(e.target)) {
        monumentsList.style.display = "none";
    }
});

searchInput.addEventListener("input", function() {
    const filter = searchInput.value.toLowerCase();
    let hasMatch = false;

    for (let i = 0; i < monuments.length; i++) {
        const title = monuments[i].querySelector(".li-title").textContent.toLowerCase();
        if (title.includes(filter) && filter !== "") {
            monuments[i].style.display = "flex";
            hasMatch = true;
        } else {
            monuments[i].style.display = "none";
        }
    }

    monumentsList.style.display = hasMatch ? "block" : "none";
});

Array.from(monuments).forEach(li => {
    li.addEventListener("click", () => {
        const url = li.getAttribute("data-url");
        if (url) window.location.href = url;
    });
});

searchInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const value = searchInput.value.trim().toLowerCase();
        let found = false;

        for (let i = 0; i < monuments.length; i++) {
            const title = monuments[i].querySelector(".li-title").textContent.toLowerCase();
            if (title.startsWith(value)) {
                const url = monuments[i].getAttribute("data-url");
                if (url) window.location.href = url;
                found = true;
                break;
            }
        }

        if (!found) {
            alert("No matching monument found.");
        }
    }
});

const searchToggle = document.getElementById("searchToggle");
const mobileSearchBox = document.getElementById("mobileSearchBox");
const mobileSearchInput = document.getElementById("mobileSearchInput");
const mobileMonumentsList = document.getElementById("mobileMonumentsList");
const mobileMonuments = mobileMonumentsList.getElementsByTagName("li");

let isOpen = false;

searchToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!isOpen) {
        mobileSearchBox.style.width = "250px";
        mobileSearchBox.style.padding = "0 10px";
        mobileSearchBox.style.backgroundColor = "#292929";
        mobileSearchInput.focus();
        isOpen = true;
    } else {
        collapseSearchBar();
    }
});

function collapseSearchBar() {
    mobileSearchBox.style.width = "0";
    mobileSearchBox.style.padding = "0";
    mobileSearchBox.style.backgroundColor = "transparent";
    mobileSearchInput.value = "";
    mobileMonumentsList.style.display = "none";
    isOpen = false;
}

document.addEventListener("click", (e) => {
    if (!mobileSearchBox.contains(e.target) &&
        !searchToggle.contains(e.target) &&
        !mobileMonumentsList.contains(e.target)) {
        if (isOpen) collapseSearchBar();
    }
});

mobileSearchInput.addEventListener("input", function() {
    const filter = mobileSearchInput.value.toLowerCase();
    let hasMatch = false;

    for (let i = 0; i < mobileMonuments.length; i++) {
        const title = mobileMonuments[i].querySelector(".li-title").textContent.toLowerCase();
        if (title.includes(filter) && filter !== "") {
            mobileMonuments[i].style.display = "flex";
            hasMatch = true;
        } else {
            mobileMonuments[i].style.display = "none";
        }
    }

    mobileMonumentsList.style.display = hasMatch ? "block" : "none";
});

Array.from(mobileMonuments).forEach(li => {
    li.addEventListener("click", () => {
        const url = li.getAttribute("data-url");
        if (url) window.location.href = url;
    });
});

mobileSearchInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const value = mobileSearchInput.value.trim().toLowerCase();
        let found = false;

        for (let i = 0; i < mobileMonuments.length; i++) {
            const title = mobileMonuments[i].querySelector(".li-title").textContent.toLowerCase();
            if (title.startsWith(value)) {
                const url = mobileMonuments[i].getAttribute("data-url");
                if (url) window.location.href = url;
                found = true;
                break;
            }
        }

        if (!found) alert("No matching monument found.");
    }
});

/********************************************
 * HEADER SCROLL EFFECT
 ********************************************/
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 130) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/********************************************
 * ANIMATIONS
 ********************************************/

// FADE IN //
window.addEventListener("load", () => {
    document.querySelector(".hero-text").classList.add("show");
});

document.addEventListener("DOMContentLoaded", function() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.2
    });

    fadeElements.forEach(el => observer.observe(el));
});

// FLOATING ICON //
const locationIcons = document.querySelectorAll('.location-icon, .visitor-container .location-icon');

setInterval(() => {
    locationIcons.forEach(icon => {
        icon.classList.add('bounce');
        setTimeout(() => icon.classList.remove('bounce'), 2000);
    });
}, 3000);

// FLOATING REFERENCE //
const bouncingElements = document.querySelectorAll('.logo_small');

setInterval(() => {
    bouncingElements.forEach(el => el.classList.add('bounce'));
    setTimeout(() => bouncingElements.forEach(el => el.classList.remove('bounce')), 2000);
}, 5000);

// UNDERLINE EFFECT //
function delayedNav(id, targetMargin, url) {
    document.getElementById(id).addEventListener("click", function(e) {
        e.preventDefault();
        const underline = document.querySelector(".nav-underline");
        underline.style.marginLeft = targetMargin + "px";

        setTimeout(() => {
            window.location.href = url;
        }, 700);
    });
}

delayedNav("navHome", -20, "../HTML/homepage.html");
delayedNav("navAbout", -20, "../HTML/homepage.html#about");
delayedNav("navExplore", 335, "../HTML/explore.html");
delayedNav("navCreators", 537, "../HTML/creators.html");

// PRELOADS HR //
window.addEventListener("load", () => {
    document.querySelectorAll('.section-divider-top, .section-divider-bottom').forEach(el => el.classList.add('show'));
});

// BURGER MENU //
const burger = document.getElementById('burgerMenu');
const mobileNav = document.getElementById('mobileNav');

burger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});
