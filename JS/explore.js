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


/********************************************
 * MOBILE NAVIGATION & SEARCH (INTEGRATED)
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
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


/********************************************
 * FADE IN
 *******************************************/
const items = document.querySelectorAll('.gallery div');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

items.forEach(item => observer.observe(item));


/********************************************
 * FADE OUT
 ********************************************/
const galleryLinks = document.querySelectorAll('.gallery a');
const fadeTarget = document.querySelector('.rome-container');

galleryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.href;
        
        if(fadeTarget) fadeTarget.classList.add('fade-out');
        const gallery = document.querySelector('.gallery');
        if(gallery) gallery.classList.add('fade-out');
        
        setTimeout(() => {
            window.location.href = url;
        }, 800);
    });
});