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

// Enquire Now form: validation + submit to Google Apps Script
(function () {
    var FORM_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwj_YFOuwVD2JHxdFFU5a7Dz9VyHYk-RnUvmw3TVA8U9rQwK_3iIs4A28zIBQwUW8Kcjw/exec";
    var form = document.getElementById("section-footer-form");
    if (!form) return;

    var emailEl = document.getElementById("footer-email");
    var phoneEl = document.getElementById("footer-phone");
    var nameEl = document.getElementById("footer-name");
    var dateEl = document.getElementById("footer-date");
    var messageEl = document.getElementById("footer-message");

    function showError(fieldName, show) {
        var err = form.querySelector(".section-footer-form-error[data-for=\"" + fieldName + "\"]");
        if (err) {
            err.classList.toggle("hidden", !show);
        }
        var input = form.querySelector("[name=\"" + fieldName + "\"]");
        if (input) {
            input.classList.toggle("border-red-500", show);
            input.classList.toggle("border-[#e5e5e5]", !show);
        }
    }

    function validateEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value || "").trim());
    }

    function validatePhone(value) {
        var cleaned = (value || "").replace(/[\s\-\(\)]/g, "");
        return /^\+?[0-9]{10,20}$/.test(cleaned);
    }

    function validateForm() {
        var name = (nameEl && nameEl.value) ? nameEl.value.trim() : "";
        var email = (emailEl && emailEl.value) ? emailEl.value.trim() : "";
        var phone = (phoneEl && phoneEl.value) ? phoneEl.value : "";
        var valid = true;
        form.querySelectorAll(".section-footer-form-error").forEach(function (el) {
            el.classList.add("hidden");
        });
        form.querySelectorAll(".section-footer-form input, .section-footer-form textarea").forEach(function (el) {
            el.classList.remove("border-red-500");
            el.classList.add("border-[#e5e5e5]");
        });

        if (!name) {
            showError("name", true);
            valid = false;
        }
        if (!email) {
            showError("email", true);
            valid = false;
        } else if (!validateEmail(email)) {
            if (form.querySelector(".section-footer-form-error[data-for=\"email\"]")) {
                form.querySelector(".section-footer-form-error[data-for=\"email\"]").textContent = "Please enter a valid email address.";
                form.querySelector(".section-footer-form-error[data-for=\"email\"]").classList.remove("hidden");
            }
            if (emailEl) {
                emailEl.classList.add("border-red-500");
                emailEl.classList.remove("border-[#e5e5e5]");
            }
            valid = false;
        }
        if (!phone) {
            showError("phone", true);
            valid = false;
        } else if (!validatePhone(phone)) {
            var errPhone = form.querySelector(".section-footer-form-error[data-for=\"phone\"]");
            if (errPhone) {
                errPhone.textContent = "Please enter a valid phone number (10–20 digits).";
                errPhone.classList.remove("hidden");
            }
            if (phoneEl) {
                phoneEl.classList.add("border-red-500");
                phoneEl.classList.remove("border-[#e5e5e5]");
            }
            valid = false;
        }
        var dateVal = (dateEl && dateEl.value) ? dateEl.value.trim() : "";
        if (!dateVal) {
            showError("date", true);
            valid = false;
        }
        var messageVal = (messageEl && messageEl.value) ? messageEl.value.trim() : "";
        if (!messageVal) {
            showError("message", true);
            if (messageEl) {
                messageEl.classList.add("border-red-500");
                messageEl.classList.remove("border-[#e5e5e5]");
            }
            valid = false;
        }
        return valid;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!validateForm()) return;

        var submitBtn = form.querySelector(".section-footer-submit");
        var originalText = submitBtn ? submitBtn.textContent : "";
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";
        }

        var formData = new FormData(form);
        var params = new URLSearchParams();
        formData.forEach(function (value, key) {
            params.append(key, value);
        });

        fetch(FORM_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString(),
        })
            .then(function () {
                window.location.href = "thank-you.html";
            })
            .catch(function () {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
                alert("Something went wrong. Please try again or contact us directly.");
            });
    });
})();


// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);