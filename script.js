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

    // ─────────────────────────────────────────────
    // Dynamic Projects Rendering (Easy to Update)
    // ─────────────────────────────────────────────
    // To add a new project, simply add a new object to this array.
    const projects = [
        {
            tag: "AI / Voice / CRM",
            title: "AI-Powered Sales Automation System",
            description: "End-to-End Lead Engagement with Voice AI. A complex, multi-tool workflow designed to handle lead qualification autonomously &mdash; integrating voice calling agents, CRM platforms, and personalized content generation using n8n and OpenAI.",
            tech: ["n8n", "OpenAI", "Voice AI", "CRM Sync"],
            link: "ai-sales-workflow.html",
            linkText: "View Detailed Workflow"
        },
        {
            tag: "SEO / AI / n8n",
            title: "SEO Keyword Research Automation",
            description: "AI-Powered Keyword Discovery &amp; Analysis. An automated workflow that researches, analyzes, and prioritizes SEO keywords using AI, dramatically cutting down manual research time and improving search engine rankings for clients.",
            tech: ["n8n", "AI Analysis", "SEO"],
            link: "seo-workflow.html",
            linkText: "View Detailed Workflow"
        },
        {
            tag: "Content / Telegram / AI",
            title: "PR Content Generation Workflow",
            description: "Multi-Modal Content Creation &amp; Research via Telegram. A workflow triggered via Telegram that conducts research and generates PR-ready content across multiple formats, enabling rapid, consistent brand communication.",
            tech: ["Telegram", "OpenAI", "n8n"],
            link: "pr-content-workflow.html",
            linkText: "View Detailed Workflow"
        },
        {
            tag: "PM / ClickUp / Automation",
            title: "Project Management Task Distribution",
            description: "Automated Meeting-to-Task Conversion for ClickUp. A system that automatically transcribes meeting notes, identifies action items, and creates structured tasks directly in ClickUp &mdash; eliminating manual post-meeting admin work.",
            tech: ["ClickUp", "n8n", "AI Transcription"],
            link: "pm-task-workflow.html",
            linkText: "View Detailed Workflow"
        },
        {
            tag: "Research / Design / Strategy",
            title: "Deep Research & UX Design: Green Attic",
            description: "Comprehensive market analysis and high-fidelity redesign for a leading Chicagoland energy contractor. Identified critical customer pain points and architected a decoupled automation system to streamline operations and enhance lead conversion.",
            tech: ["Research Skills", "UI/UX Design", "Workflow Strategy", "Decoupled Architecture"],
            link: "green-attic-presentation.html",
            linkText: "View Case Study"
        },
        // --- NEW DRIVE PROJECTS ADDED BELOW: ---
        {
            tag: "AI / Automation",
            title: "Advanced AI Automation Workflows",
            description: "End-to-end intelligent orchestration of business systems using n8n and OpenAI. Automated client communications, generated custom lead magnets, and replaced redundant manual data entry, saving over 20+ hours per week for executive leadership.",
            tech: ["n8n", "OpenAI", "Zapier"],
            link: "ai-automation-workflow.html",
            linkText: "View Case Study"
        },
        {
            tag: "Lead Gen / Strategy",
            title: "High-Volume Lead Generation Strategy",
            description: "Targeted research infrastructure supporting investor outreach and angel networking. Leveraged custom CRM pipelines to manage multiple overlapping campaigns, increasing response rates by precisely matching investor thesis.",
            tech: ["CRM Pipelines", "Email Marketing", "Data Mining"],
            link: "lead-gen-strategy.html",
            linkText: "View Case Study"
        },
        {
            tag: "SOP / Operations",
            title: "Real Estate Operations SOP Hub",
            description: "End-to-End procedural documentation and systems integration for the J. Boswell Team. Enhanced client experience and dramatically reduced closing friction by enforcing strict operational standards and budget forecasting.",
            tech: ["Process Optimization", "Documentation", "Compliance"],
            link: "real-estate-sop.html",
            linkText: "View Case Study"
        }
    ];

    const projectsGrid = document.getElementById("dynamic-projects-grid");
    if (projectsGrid) {
        projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card glass-card glow-card hover-target";
            
            const techSpans = project.tech.map(t => `<span>${t}</span>`).join("");
            
            card.innerHTML = `
                <span class="project-tag">${project.tag}</span>
                <h3>${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${techSpans}
                </div>
                <a href="${project.link}" class="btn-secondary" style="margin-top: 1rem; width: fit-content; font-size: 0.85rem;">${project.linkText}</a>
            `;
            projectsGrid.appendChild(card);
        });
    }

});
