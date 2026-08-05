/**
 * AAA VIDEO GAME PORTFOLIO ENGINE - VANILLA JAVASCRIPT
 * Real-Time GitHub REST API Synchronization & Dynamic Interactive FX
 */

document.addEventListener('DOMContentLoaded', () => {
    // Global App State & Config
    const CONFIG = {
        githubUsername: 'Bigdugg23',
        apiBaseUrl: 'https://api.github.com',
        cacheKeyProfile: 'bigdugg23_gh_profile_cache',
        cacheKeyRepos: 'bigdugg23_gh_repos_cache',
        cacheTTLMins: 15,
        titleRotations: [
            'Software Engineer',
            'Front-End Developer',
            'Creative Technologist',
            'AI Builder',
            'Data Analyst'
        ]
    };

    let allRepositories = [];

    // Initialize Engine Modules
    initLoadingScreen();
    initThemeManager();
    initCustomCursor();
    initAmbientCanvas();
    initHeaderAndProgress();
    initRotatingTitles();
    initIntersectionObservers();
    initTiltAndMagnetic();
    initGitHubIntegration();
    initProjectSearchAndFilter();
    initFormAndInteractions();
    initKeyboardShortcuts();

    /* ==========================================================================
       1. LOADING SCREEN ANIMATION
       ========================================================================== */
    function initLoadingScreen() {
        const loaderFill = document.getElementById('loaderFill');
        const loaderPercent = document.getElementById('loaderPercent');
        const loaderStatusText = document.getElementById('loaderStatusText');
        const loadingScreen = document.getElementById('loadingScreen');

        const statuses = [
            'CONNECTING TO GITHUB REST API...',
            'PARSING REPOSITORY ARCHITECTURE...',
            'INITIALIZING AAA SHADERS & LIGHTING...',
            'COMPILING ASSETS & GRAPHICS...',
            'SYSTEM READY'
        ];

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 12) + 5;
            if (progress > 100) progress = 100;

            if (loaderFill) loaderFill.style.width = `${progress}%`;
            if (loaderPercent) loaderPercent.textContent = `${progress}%`;

            const statusIdx = Math.min(Math.floor((progress / 100) * statuses.length), statuses.length - 1);
            if (loaderStatusText) loaderStatusText.textContent = statuses[statusIdx];

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    if (loadingScreen) loadingScreen.classList.add('fade-out');
                    triggerCounters();
                }, 400);
            }
        }, 80);
    }

    /* ==========================================================================
       2. THEME MANAGER (NBA / DARK / LIGHT) WITH LOCAL STORAGE
       ========================================================================== */
    function initThemeManager() {
        const themeBtns = document.querySelectorAll('.theme-btn');
        const savedTheme = localStorage.getItem('bigdugg_theme') || 'nba';

        applyTheme(savedTheme);

        themeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedTheme = btn.dataset.theme;
                applyTheme(selectedTheme);
                showToast(`Switched to ${selectedTheme.toUpperCase()} theme`);
            });
        });

        function applyTheme(theme) {
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('bigdugg_theme', theme);

            themeBtns.forEach(b => {
                if (b.dataset.theme === theme) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
        }
    }

    /* ==========================================================================
       3. GLOWING & TRAILING CUSTOM CURSOR
       ========================================================================== */
    function initCustomCursor() {
        const cursor = document.getElementById('cursor');
        const follower = document.getElementById('cursorFollower');

        if (!cursor || !follower) return;

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        });

        function renderFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;

            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;

            requestAnimationFrame(renderFollower);
        }
        renderFollower();

        const interactiveEls = document.querySelectorAll('a, button, input, select, textarea, .tilt-card');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
                follower.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
                follower.classList.remove('hovered');
            });
        });
    }

    /* ==========================================================================
       4. AMBIENT CANVAS DYNAMIC PARTICLES
       ========================================================================== */
    function initAmbientCanvas() {
        const canvas = document.getElementById('ambientCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = Array.from({ length: 45 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            alpha: Math.random() * 0.5 + 0.2
        }));

        function animate() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 210, 255, ${p.alpha})`;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }
        animate();
    }

    /* ==========================================================================
       5. NAVBAR & SCROLL PROGRESS BAR
       ========================================================================== */
    function initHeaderAndProgress() {
        const progressBar = document.getElementById('progressBar');
        const backToTopBtn = document.getElementById('backToTopBtn');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;

            if (progressBar) progressBar.style.width = `${scrolled}%`;

            if (backToTopBtn) {
                if (winScroll > 400) backToTopBtn.classList.add('visible');
                else backToTopBtn.classList.remove('visible');
            }

            // Timeline line growth
            const timelineLine = document.getElementById('timelineProgressLine');
            if (timelineLine) {
                const timelineSec = document.getElementById('timeline');
                if (timelineSec) {
                    const rect = timelineSec.getBoundingClientRect();
                    const lineProgress = Math.min(Math.max((window.innerHeight - rect.top) / rect.height, 0), 1);
                    timelineLine.style.background = `linear-gradient(to bottom, var(--accent-blue) ${lineProgress * 100}%, rgba(255,255,255,0.1) ${lineProgress * 100}%)`;
                }
            }
        });

        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }

    /* ==========================================================================
       6. HERO ROTATING TYPOGRAPHY
       ========================================================================== */
    function initRotatingTitles() {
        const titleEl = document.getElementById('rotatingTitle');
        if (!titleEl) return;

        let index = 0;
        setInterval(() => {
            index = (index + 1) % CONFIG.titleRotations.length;
            titleEl.style.opacity = '0';
            titleEl.style.transform = 'translateY(10px)';

            setTimeout(() => {
                titleEl.textContent = CONFIG.titleRotations[index];
                titleEl.style.opacity = '1';
                titleEl.style.transform = 'translateY(0)';
            }, 300);
        }, 3000);
    }

    /* ==========================================================================
       7. INTERSECTION OBSERVER ANIMATIONS & COUNTERS
       ========================================================================== */
    function initIntersectionObservers() {
        const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide-up, .reveal-slide-left, .reveal-slide-right, .reveal-scale');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');

                    // Skill progress bar animation trigger
                    if (entry.target.classList.contains('skill-category-card')) {
                        const fills = entry.target.querySelectorAll('.progress-fill');
                        fills.forEach(f => {
                            f.style.width = f.dataset.progress;
                        });
                    }
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => observer.observe(el));
    }

    function triggerCounters() {
        const gpaEl = document.getElementById('statGpa');
        if (gpaEl) animateValue(gpaEl, 0, 63.46, 1800, true);
    }

    function animateValue(obj, start, end, duration, isDecimal = false) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const val = progress * (end - start) + start;
            obj.innerHTML = isDecimal ? `${val.toFixed(2)}%` : Math.floor(val);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    /* ==========================================================================
       8. 3D TILT CARDS & MAGNETIC BUTTONS
       ========================================================================== */
    function initTiltAndMagnetic() {
        const tiltCards = document.querySelectorAll('.tilt-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });

        const magnetics = document.querySelectorAll('.magnetic');
        magnetics.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    /* ==========================================================================
       9. LIVE GITHUB REST API INTEGRATION WITH LOCALSTORAGE CACHING
       ========================================================================== */
    async function initGitHubIntegration() {
        try {
            const profileData = await fetchWithCache(`${CONFIG.apiBaseUrl}/users/${CONFIG.githubUsername}`, CONFIG.cacheKeyProfile);
            renderGitHubProfile(profileData);

            const reposData = await fetchWithCache(`${CONFIG.apiBaseUrl}/users/${CONFIG.githubUsername}/repos?sort=updated&per_page=100`, CONFIG.cacheKeyRepos);
            allRepositories = reposData;

            const heroRepoCount = document.getElementById('heroRepoCount');
            if (heroRepoCount) heroRepoCount.textContent = reposData.length;

            renderGitHubLanguages(reposData);
            populateLanguageFilter(reposData);
            renderRepositories(reposData);

        } catch (error) {
            console.error('GitHub API Error:', error);
            const grid = document.getElementById('projectsGrid');
            if (grid) {
                grid.innerHTML = `<div class="glassmorphism" style="grid-column: 1/-1; padding: 2rem; text-align: center;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: var(--accent-pink); margin-bottom: 1rem;"></i>
                    <p>Unable to fetch live GitHub repositories. Displaying cached fallback.</p>
                </div>`;
            }
        }
    }

    async function fetchWithCache(url, cacheKey) {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            const { timestamp, data } = JSON.parse(cached);
            const isExpired = (Date.now() - timestamp) > (CONFIG.cacheTTLMins * 60 * 1000);
            if (!isExpired) return data;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`API HTTP Error: ${response.status}`);

        const data = await response.json();
        localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
        return data;
    }

    function renderGitHubProfile(profile) {
        const card = document.getElementById('githubProfileCard');
        if (!card) return;

        card.innerHTML = `
            <img src="${profile.avatar_url}" alt="${profile.name}" class="gh-profile-avatar">
            <h3 class="gh-profile-name">${profile.name || CONFIG.githubUsername}</h3>
            <div class="gh-profile-login">@${profile.login}</div>
            <p class="gh-profile-bio">${profile.bio || 'Software Engineer & Creative Technologist'}</p>
            <div class="gh-meta-list">
                <div><i class="fas fa-building"></i> ${profile.company || 'North-West University'}</div>
                <div><i class="fas fa-map-marker-alt"></i> ${profile.location || 'South Africa'}</div>
                <div><i class="fas fa-link"></i> <a href="${profile.blog || 'https://bigdugg23.github.io'}" target="_blank" style="color:var(--text-primary);">${profile.blog || 'Portfolio'}</a></div>
            </div>
            <a href="${profile.html_url}" target="_blank" class="btn btn-secondary btn-block magnetic" style="margin-top: 1.5rem;">
                <i class="fab fa-github"></i> View Profile
            </a>
        `;

        document.getElementById('ghMetricRepos').textContent = profile.public_repos;
        document.getElementById('ghMetricFollowers').textContent = profile.followers;
        document.getElementById('ghMetricFollowing').textContent = profile.following;
    }

    function renderGitHubLanguages(repos) {
        const langCounts = {};
        let totalStars = 0;

        repos.forEach(repo => {
            totalStars += repo.stargazers_count;
            if (repo.language) {
                langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            }
        });

        document.getElementById('ghMetricStars').textContent = totalStars;

        const container = document.getElementById('languagesDistribution');
        if (!container) return;

        const totalReposWithLang = Object.values(langCounts).reduce((a, b) => a + b, 0);
        const sortedLangs = Object.entries(langCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

        container.innerHTML = sortedLangs.map(([lang, count]) => {
            const percent = Math.round((count / totalReposWithLang) * 100);
            return `
                <div class="lang-bar-item">
                    <div class="lang-bar-info">
                        <span>${lang}</span>
                        <span>${percent}%</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" style="width: ${percent}%;"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function populateLanguageFilter(repos) {
        const select = document.getElementById('languageFilterSelect');
        if (!select) return;

        const languages = new Set();
        repos.forEach(r => { if (r.language) languages.add(r.language); });

        languages.forEach(lang => {
            const opt = document.createElement('option');
            opt.value = lang;
            opt.textContent = lang;
            select.appendChild(opt);
        });
    }

    function renderRepositories(repos) {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        if (repos.length === 0) {
            grid.innerHTML = `<div class="glassmorphism" style="grid-column: 1/-1; padding: 2rem; text-align: center;">No matching repositories found.</div>`;
            return;
        }

        grid.innerHTML = repos.map(repo => {
            const topics = repo.topics || [];
            const topicsHTML = topics.slice(0, 3).map(t => `<span class="topic-tag">${t}</span>`).join('');
            const hasHomepage = repo.homepage && repo.homepage.trim() !== '';

            return `
                <div class="repo-card glassmorphism tilt-card">
                    <div class="repo-card-top">
                        <div class="repo-header">
                            <h3 class="repo-title">${repo.name}</h3>
                            <span class="repo-badge-vis">${repo.visibility || 'Public'}</span>
                        </div>
                        <p class="repo-desc">${repo.description || 'No description provided for this repository.'}</p>
                        <div class="repo-topics">${topicsHTML}</div>
                    </div>

                    <div>
                        <div class="repo-meta">
                            <span class="repo-meta-item"><i class="fas fa-circle" style="color: var(--accent-blue); font-size: 0.6rem;"></i> ${repo.language || 'Code'}</span>
                            <span class="repo-meta-item"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                            <span class="repo-meta-item"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        </div>

                        <div class="repo-links">
                            <a href="${repo.html_url}" target="_blank" class="btn btn-secondary magnetic"><i class="fab fa-github"></i> Source</a>
                            ${hasHomepage ? `<a href="${repo.homepage}" target="_blank" class="btn btn-primary magnetic"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        initTiltAndMagnetic();
    }

    /* ==========================================================================
       10. SEARCH, FILTER & SORTING LOGIC
       ========================================================================== */
    function initProjectSearchAndFilter() {
        const searchInput = document.getElementById('repoSearchInput');
        const languageSelect = document.getElementById('languageFilterSelect');
        const sortSelect = document.getElementById('sortOrderSelect');

        function applyFilters() {
            let filtered = [...allRepositories];

            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            if (searchTerm) {
                filtered = filtered.filter(r => 
                    r.name.toLowerCase().includes(searchTerm) ||
                    (r.description && r.description.toLowerCase().includes(searchTerm)) ||
                    (r.language && r.language.toLowerCase().includes(searchTerm))
                );
            }

            const selectedLang = languageSelect ? languageSelect.value : 'all';
            if (selectedLang !== 'all') {
                filtered = filtered.filter(r => r.language === selectedLang);
            }

            const sortOrder = sortSelect ? sortSelect.value : 'updated';
            filtered.sort((a, b) => {
                if (sortOrder === 'updated') return new Date(b.updated_at) - new Date(a.updated_at);
                if (sortOrder === 'stars') return b.stargazers_count - a.stargazers_count;
                if (sortOrder === 'newest') return new Date(b.created_at) - new Date(a.created_at);
                if (sortOrder === 'oldest') return new Date(a.created_at) - new Date(b.created_at);
                if (sortOrder === 'name') return a.name.localeCompare(b.name);
                return 0;
            });

            renderRepositories(filtered);
        }

        if (searchInput) searchInput.addEventListener('input', applyFilters);
        if (languageSelect) languageSelect.addEventListener('change', applyFilters);
        if (sortSelect) sortSelect.addEventListener('change', applyFilters);
    }

    /* ==========================================================================
       11. FORM HANDLING & INTERACTIVE ACTIONS
       ========================================================================== */
    function initFormAndInteractions() {
        const downloadBtns = [document.getElementById('downloadCVBtn')];
        downloadBtns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => {
                    showToast('Generating official CV PDF package...');
                    setTimeout(() => {
                        window.open('https://github.com/Bigdugg23', '_blank');
                    }, 1000);
                });
            }
        });

        const copyEmailBtn = document.getElementById('copyEmailBtn');
        if (copyEmailBtn) {
            copyEmailBtn.addEventListener('click', () => {
                navigator.clipboard.writeText('phethotsoeu1@gmail.com');
                showToast('Email address copied to clipboard!');
            });
        }

        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showToast('Transmission Sent! Thank you for reaching out.');
                contactForm.reset();
            });
        }

        const musicBtn = document.getElementById('musicToggleBtn');
        if (musicBtn) {
            let isMuted = true;
            musicBtn.addEventListener('click', () => {
                isMuted = !isMuted;
                musicBtn.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
                showToast(isMuted ? 'Ambient Audio Muted' : 'Ambient Audio FX Active');
            });
        }
    }

    /* ==========================================================================
       12. KEYBOARD SHORTCUTS ACCESSIBILITY
       ========================================================================== */
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Shift + T = Toggle Theme
            if (e.shiftKey && e.key.toLowerCase() === 't') {
                const currentTheme = document.body.getAttribute('data-theme');
                const nextTheme = currentTheme === 'nba' ? 'dark' : (currentTheme === 'dark' ? 'light' : 'nba');
                document.body.setAttribute('data-theme', nextTheme);
                localStorage.setItem('bigdugg_theme', nextTheme);
                showToast(`Keyboard Shortcut: Switched to ${nextTheme.toUpperCase()}`);
            }
        });
    }

    /* Helper Toast Notification */
    function showToast(message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});
