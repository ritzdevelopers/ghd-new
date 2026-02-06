// Navbar: scroll par shadow add (optional - better visibility)
(function () {
    var nav = document.getElementById("main-nav");
    if (!nav) return;
    function onScroll() {
        if (window.scrollY > 10) {
            nav.classList.add("nav-scrolled");
        } else {
            nav.classList.remove("nav-scrolled");
        }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
})();

// Mobile/Tablet nav menu: hamburger open/close, open par cross dikhao
(function () {
    var hamburger = document.getElementById("nav-hamburger");
    var overlay = document.getElementById("nav-menu-overlay");
    var closeBtn = document.getElementById("nav-menu-close");
    var menuLinks = overlay ? overlay.querySelectorAll(".nav-menu-link") : [];

    function openMenu() {
        if (overlay) {
            overlay.classList.add("is-open");
            overlay.setAttribute("aria-hidden", "false");
            document.body.classList.add("nav-menu-open");
        }
        if (hamburger) {
            hamburger.classList.add("is-open");
            hamburger.setAttribute("aria-label", "Close menu");
        }
    }
    function closeMenu() {
        if (overlay) {
            overlay.classList.remove("is-open");
            overlay.setAttribute("aria-hidden", "true");
            document.body.classList.remove("nav-menu-open");
        }
        if (hamburger) {
            hamburger.classList.remove("is-open");
            hamburger.setAttribute("aria-label", "Open menu");
        }
    }

    if (hamburger) {
        hamburger.addEventListener("click", function () {
            if (overlay && overlay.classList.contains("is-open")) closeMenu();
            else openMenu();
        });
    }
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    menuLinks.forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    // lg breakpoint par resize pe menu band
    window.addEventListener("resize", function () {
        if (window.matchMedia("(min-width: 1024px)").matches) closeMenu();
    });
})();

// Key Highlights Swiper: mobile 1, tablet 2, large 3 (same as before)
(function () {
    var el = document.querySelector(".key-highlights-swiper");
    if (!el || typeof Swiper === "undefined") return;
    new Swiper(".key-highlights-swiper", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        loop: true,
        loopAdditionalSlides: 3,
        speed: 600,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".key-highlights-pagination",
            clickable: true,
            dynamicBullets: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 24,
            },
            768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 16,
            },
        },
    });
})();
