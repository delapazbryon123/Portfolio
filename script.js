document.addEventListener("DOMContentLoaded", () => {
    // Update year
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Navbar scroll effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-links a");

    function toggleMenu() {
        mobileMenu.classList.toggle("active");
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    });

    // ─────────────────────────────────────────────
    // Hero Frame-Sequence Animation (80 JPG frames)
    // ─────────────────────────────────────────────
    const canvas = document.getElementById("heroCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const TOTAL_FRAMES = 80;
        const FPS = 24; // frames per second — smooth cinematic feel
        const FRAME_INTERVAL = 1000 / FPS;

        const BASE_NAME = "52c83c13-ce6e-4132-a8b5-ec62d70b7a87";

        // Pre-load all frames
        const frames = [];
        let loadedCount = 0;
        let animationStarted = false;

        function padIndex(i) {
            return String(i).padStart(3, "0");
        }

        function startAnimation() {
            if (animationStarted) return;
            animationStarted = true;

            let currentFrame = 0;
            let lastTime = 0;

            function draw(timestamp) {
                if (timestamp - lastTime >= FRAME_INTERVAL) {
                    const img = frames[currentFrame];
                    if (img && img.complete) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    }
                    currentFrame = (currentFrame + 1) % TOTAL_FRAMES;
                    lastTime = timestamp;
                }
                requestAnimationFrame(draw);
            }

            requestAnimationFrame(draw);
        }

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `hero/${BASE_NAME}_${padIndex(i)}.jpg`;
            img.onload = () => {
                loadedCount++;
                // Start animation as soon as first few frames are ready
                if (loadedCount >= 5 && !animationStarted) {
                    startAnimation();
                }
            };
            frames.push(img);
        }
    }

    // ─────────────────────────────────────────────
    // Intersection Observer for scroll animations
    // ─────────────────────────────────────────────
    const revealElements = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
});
