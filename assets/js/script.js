/* ============================================
   RUANG TRADER — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Navbar Scroll Effect ───────────────────────────
    const navbar = document.getElementById('navbar');

    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // ─── Mobile Menu ────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ─── Smooth Scroll for Anchor Links ─────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ─── Counter Animation ──────────────────────────────
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;

        const statsSection = document.getElementById('hero-stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            countersAnimated = true;

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'), 10);
                const duration = 2000;
                const startTime = performance.now();

                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease-out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);

                    counter.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                };

                requestAnimationFrame(updateCounter);
            });
        }
    };

    window.addEventListener('scroll', animateCounters, { passive: true });
    // Check on load too
    animateCounters();

    // ─── Scroll Reveal Animations ───────────────────────
    const addRevealClasses = () => {
        // Feature cards
        document.querySelectorAll('.feature-card').forEach((card, i) => {
            card.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 6)}`);
        });

        // Step cards
        document.querySelectorAll('.step-card').forEach((card, i) => {
            card.classList.add('reveal', `reveal-delay-${i + 1}`);
        });

        // Testimonial marquee rows
        document.querySelectorAll('.testi-marquee').forEach((row, i) => {
            row.classList.add('reveal', `reveal-delay-${i + 1}`);
        });

        // Pricing cards
        document.querySelectorAll('.pricing-card').forEach((card, i) => {
            card.classList.add('reveal', `reveal-delay-${i + 1}`);
        });

        // Section headers
        document.querySelectorAll('.section-header').forEach(header => {
            header.classList.add('reveal');
        });

        // About section
        const aboutVisual = document.getElementById('about-visual');
        const aboutText = document.getElementById('about-text');
        if (aboutVisual) aboutVisual.classList.add('reveal');
        if (aboutText) aboutText.classList.add('reveal', 'reveal-delay-2');

        // CTA box
        const ctaBox = document.getElementById('cta-box');
        if (ctaBox) ctaBox.classList.add('reveal');

        // Exchange Partner card
        const partnerCard = document.getElementById('partner-bingx');
        if (partnerCard) partnerCard.classList.add('reveal');
    };

    addRevealClasses();

    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ─── Active Nav Link Highlighting ───────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const highlightNav = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = '#F8FAFC';
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ─── Parallax Effect on Hero Glows ──────────────────
    const heroGlow1 = document.querySelector('.hero-glow-1');
    const heroGlow2 = document.querySelector('.hero-glow-2');

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;

        if (heroGlow1) {
            heroGlow1.style.transform = `translate(${x}px, ${y}px)`;
        }
        if (heroGlow2) {
            heroGlow2.style.transform = `translate(${-x}px, ${-y}px)`;
        }
    }, { passive: true });

    // ─── Pricing Card Hover Tilt ────────────────────────
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ─── Typing effect for hero badge (optional subtle pulse) ─
    const badge = document.querySelector('.hero-badge');
    if (badge) {
        setInterval(() => {
            badge.style.boxShadow = '0 0 20px rgba(0, 208, 132, 0.2)';
            setTimeout(() => {
                badge.style.boxShadow = 'none';
            }, 1000);
        }, 3000);
    }

    // ─── Lightbox for Testimonial Screenshots ───────────
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    // Collect unique image sources
    const allScreenshots = [];
    const seenSrcs = new Set();
    document.querySelectorAll('.testi-screenshot img').forEach(img => {
        const src = img.getAttribute('src');
        if (!seenSrcs.has(src)) {
            seenSrcs.add(src);
            allScreenshots.push(src);
        }
    });

    let currentIndex = 0;

    const openLightbox = (index) => {
        currentIndex = index;
        lightboxImg.src = allScreenshots[currentIndex];
        lightboxCounter.textContent = `${currentIndex + 1} / ${allScreenshots.length}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    const showPrev = () => {
        currentIndex = (currentIndex - 1 + allScreenshots.length) % allScreenshots.length;
        lightboxImg.src = allScreenshots[currentIndex];
        lightboxCounter.textContent = `${currentIndex + 1} / ${allScreenshots.length}`;
    };

    const showNext = () => {
        currentIndex = (currentIndex + 1) % allScreenshots.length;
        lightboxImg.src = allScreenshots[currentIndex];
        lightboxCounter.textContent = `${currentIndex + 1} / ${allScreenshots.length}`;
    };

    // Click on screenshot to open lightbox
    document.querySelectorAll('.testi-screenshot').forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.getAttribute('data-index'), 10);
            openLightbox(index);
        });
    });

    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);

    // Close on overlay click (not on image)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    // Touch swipe support
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) showPrev();
            else showNext();
        }
    }, { passive: true });

    // ─── Xendit Payment Gateway Integration ─────────────
    const handleCheckout = async (packageType, button) => {
        const originalText = button.textContent;
        button.textContent = 'Memproses...';
        button.style.pointerEvents = 'none';
        button.style.opacity = '0.8';

        try {
            const response = await fetch('http://localhost:3000/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ packageType })
            });

            const data = await response.json();

            if (response.ok && data.checkout_url) {
                // Redirect user to Xendit Invoice URL
                window.location.href = data.checkout_url;
            } else {
                alert('Terjadi kesalahan: ' + (data.message || 'Gagal terhubung ke server'));
                button.textContent = originalText;
                button.style.pointerEvents = 'auto';
                button.style.opacity = '1';
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Gagal menghubungi server pembayaran. Pastikan backend berjalan.');
            button.textContent = originalText;
            button.style.pointerEvents = 'auto';
            button.style.opacity = '1';
        }
    };

    const btnBasic = document.getElementById('btn-basic');
    const btnPremium = document.getElementById('btn-premium');

    if (btnBasic) {
        btnBasic.addEventListener('click', (e) => {
            e.preventDefault();
            handleCheckout('basic', btnBasic);
        });
    }

    if (btnPremium) {
        btnPremium.addEventListener('click', (e) => {
            e.preventDefault();
            handleCheckout('vip', btnPremium);
        });
    }

    // ─── Referral Code Copy ─────────────────────────────
    const copyBtn = document.getElementById('copy-referral');
    const referralCode = document.getElementById('referral-code');
    if (copyBtn && referralCode) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(referralCode.textContent).then(() => {
                copyBtn.classList.add('copied');
                // Change icon to checkmark briefly
                const originalSVG = copyBtn.innerHTML;
                copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D084" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                setTimeout(() => {
                    copyBtn.innerHTML = originalSVG;
                    copyBtn.classList.remove('copied');
                }, 2000);
            });
        });
    }



});
