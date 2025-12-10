/********************************************
 * SEARCH BAR INTERACTION (DESKTOP)
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


/********************************************
 * INTEGRATED MOBILE LOGIC (NAV & SEARCH)
 ********************************************/
const burger = document.getElementById('burgerMenu');
const mobileNav = document.getElementById('mobileNav');

const searchToggle = document.getElementById("searchToggle");
const mobileSearchBox = document.getElementById("mobileSearchBox");
const mobileSearchInput = document.getElementById("mobileSearchInput");
const mobileMonumentsList = document.getElementById("mobileMonumentsList");
const mobileMonuments = mobileMonumentsList.getElementsByTagName("li");

let isOpen = false; 

function collapseSearchBar() {
    mobileSearchBox.style.width = "0";
    mobileSearchBox.style.padding = "0";
    mobileSearchBox.style.backgroundColor = "transparent";
    mobileSearchInput.value = "";
    mobileMonumentsList.style.display = "none";
    isOpen = false;
}

burger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');

    if (isOpen) {
        collapseSearchBar();
    }
});

searchToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!isOpen) {
        mobileSearchBox.style.width = "250px";
        mobileSearchBox.style.padding = "0 10px";
        mobileSearchBox.style.backgroundColor = "#292929";
        mobileSearchInput.focus();
        isOpen = true;
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }
    } else {
        collapseSearchBar();
    }
});

document.addEventListener("click", (e) => {
    if (!document.querySelector(".search-box").contains(e.target)) {
        monumentsList.style.display = "none";
    }

    if (!mobileNav.contains(e.target) && !burger.contains(e.target)) {
        mobileNav.classList.remove('active');
    }

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
 * CAROUSEL SETUP AND CLONING
 ********************************************/
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const gap = 10;
const originalLength = slides.length;
const cloneCount = 50;
let currentIndex = originalLength;
let slideInterval;
let manualOffset = 60;

for (let i = 0; i < cloneCount; i++) {
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });
}


/********************************************
 * IMAGE LOADING CHECK (WAIT BEFORE STARTING)
 ********************************************/
const allImages = track.querySelectorAll('img');
let imagesLoaded = 0;

allImages.forEach(img => {
    if (img.complete) {
        imagesLoaded++;
    } else {
        img.addEventListener('load', () => {
            imagesLoaded++;
            if (imagesLoaded === allImages.length) {
                initCarousel();
            }
        });
    }
});

if (imagesLoaded === allImages.length) {
    initCarousel();
}


/********************************************
 * INITIALIZE CAROUSEL
 ********************************************/
function initCarousel() {
    moveToSlide(currentIndex, false);
    slideInterval = setInterval(nextSlide, 5000);
}


/********************************************
 * POSITION / MOVEMENT CALCULATIONS
 ********************************************/
function getSlideWidth(index) {
    return track.children[index].offsetWidth + gap;
}

function moveToSlide(index, animate = true) {
    const containerWidth = track.parentElement.offsetWidth;
    const slide = track.children[index];
    const slideWidth = slide.offsetWidth + gap;

    let offset = 0;
    for (let i = 0; i < index; i++) {
        offset += getSlideWidth(i);
    }

    const centerOffset = containerWidth / 2 - slideWidth / 2;

    track.style.transition = animate ? "transform 0.8s ease" : "none";
    track.style.transform = `translateX(${-offset + centerOffset}px)`;

    Array.from(track.children).forEach(slide => {
        slide.classList.remove(
            "slide1-rotate",
            "slide2-rotate",
            "slide4-rotate",
            "slide5-rotate"
        );
    });

    const rotationPositions = [
        { spot: 0, className: "slide1-rotate" },
        { spot: 1, className: "slide2-rotate" },
        { spot: 3, className: "slide4-rotate" },
        { spot: 4, className: "slide5-rotate" }
    ];

    rotationPositions.forEach(({ spot, className }) => {
        let visualIndex = index + spot;
        visualIndex = visualIndex % track.children.length;
        track.children[visualIndex].classList.add(className);
    });
}


/********************************************
 * NEXT & PREVIOUS SLIDE MOVEMENT
 ********************************************/
function nextSlide() {
    currentIndex++;
    moveToSlide(currentIndex, true);

    if (currentIndex >= originalLength * (cloneCount + 1)) {
        setTimeout(() => {
            currentIndex = originalLength;
            moveToSlide(currentIndex, false);
        }, 800);
    }
}

function prevSlide() {
    currentIndex--;

    if (currentIndex < 0) {
        setTimeout(() => {
            currentIndex = originalLength * cloneCount - 1;
            moveToSlide(currentIndex, false);
        }, 20);
    } else {
        moveToSlide(currentIndex, true);
    }
}


/********************************************
 * BUTTON CONTROLS + RESETTING INTERVAL
 ********************************************/
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");

if(nextBtn) {
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetInterval();
    });
}

if(prevBtn) {
    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetInterval();
    });
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}


/********************************************
 * FADE INs
 ********************************************/
const fadeElements = document.querySelectorAll('.fade-in, .fade-move');

function checkFade() {
    fadeElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);

document.getElementById("btnExplore").addEventListener("click", () => {
    window.location.href = "explore.html";
});