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
            tag: "n8n · 100+ Workflows · 15 Categories",
            title: "N8N Workflow Vault",
            description: "A full production catalog of <strong>100+ intelligent automation workflows</strong> spanning PR &amp; media outreach, SEO app suites, AI bots, lead generation, blog publishing, video processing, and more &mdash; all built and deployed for real clients.",
            tech: ["n8n", "OpenAI", "Gemini", "Multi-Agent", "Telegram", "Apify", "ClickUp", "Google Suite"],
            link: "n8n-workflows.html",
            linkText: "Explore 100+ Workflows →",
            featured: true
        },
        {
            tag: "SEO / AI / Full-Stack",
            title: "Agency OS — AI SEO Report Generator",
            description: "A full-stack web app that generates professional, client-ready 11-section SEO reports from any website URL in under 40 seconds. Powered by Firecrawl (web scraping) and Google Gemini 2.5 Flash AI. Reports include keyword analysis, technical health scoring, a 30/60/90-day action plan, and are instantly downloadable as print-ready PDF.",
            tech: ["Next.js", "Gemini AI", "Firecrawl", "TypeScript", "Vercel"],
            link: "agency-os.html",
            linkText: "View Case Study",
            externalLink: "https://frontend-seven-wine-36.vercel.app",
            externalLinkText: "🚀 Launch App",
            githubLink: "https://github.com/delapazbryon123/agency-os-frontend",
            isLive: true
        },
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

            if (project.featured) {
                // Featured hero card — spans full width with yellow accent border
                card.className = "project-card glass-card hover-target";
                card.style.cssText = "grid-column: 1 / -1; border-color: rgba(250,204,21,0.35); background: linear-gradient(145deg, rgba(30,25,5,0.75), rgba(10,8,0,0.95)); box-shadow: 0 0 60px rgba(250,204,21,0.08);";
                card.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem;">
                        <div style="flex:1; min-width:260px;">
                            <span class="project-tag" style="background:rgba(250,204,21,0.12); border-color:rgba(250,204,21,0.4); color:var(--accent-yellow);">${project.tag}</span>
                            <h3 style="font-size:2.2rem; margin-bottom:1rem;">${project.title}</h3>
                            <p class="project-description">${project.description}</p>
                            <div class="project-tech" style="margin-top:1.2rem;">${project.tech.map(t => `<span>${t}</span>`).join("")}</div>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:0.8rem; align-self:center;">
                            <div style="text-align:center; padding:1.2rem 2rem; background:rgba(250,204,21,0.06); border:1px solid rgba(250,204,21,0.2); border-radius:1rem;">
                                <div style="font-size:3rem; font-weight:800; color:var(--accent-yellow);">100+</div>
                                <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; color:#9CA3AF;">Workflows Built</div>
                            </div>
                            <a href="${project.link}" class="btn-primary" style="text-align:center; padding:0.9rem 1.6rem;">${project.linkText}</a>
                        </div>
                    </div>
                `;
            } else {
                card.className = "project-card glass-card glow-card hover-target";
                if (project.isLive) {
                    card.style.cssText = "border-color: rgba(250,204,21,0.3); position: relative; overflow: hidden;";
                }
                const techSpans = project.tech.map(t => `<span>${t}</span>`).join("");
                const liveBadge = project.isLive ? `<div style="position: absolute; top: 1rem; right: 1rem; background: #FACC15; color: #000; font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 999px; letter-spacing: 1px;">LIVE ✦</div>` : "";
                const target = project.isExternal ? 'target="_blank" rel="noopener noreferrer"' : "";
                const externalBtn = project.externalLink ? `<a href="${project.externalLink}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="margin-top: 1rem; width: fit-content; font-size: 0.85rem;">${project.externalLinkText}</a>` : "";
                const githubBtn = project.githubLink ? `<a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="btn-outline" style="margin-top: 1rem; width: fit-content; font-size: 0.85rem;">GitHub</a>` : "";
                card.innerHTML = `
                    ${liveBadge}
                    <span class="project-tag">${project.tag}</span>
                    <h3>${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">${techSpans}</div>
                    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                        <a href="${project.link}" ${target} class="btn-secondary" style="margin-top: 1rem; width: fit-content; font-size: 0.85rem;">${project.linkText}</a>
                        ${externalBtn}
                        ${githubBtn}
                    </div>
                `;
            }

            projectsGrid.appendChild(card);
        });
    }

});
