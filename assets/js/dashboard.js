/* ============================================
   RUANG TRADER — Dashboard JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Modul Data ─────────────────────────────────────
    const MODULES = [
        {
            id: 1,
            title: 'Dasar-Dasar Trading Crypto',
            desc: 'Pelajari fundamental cryptocurrency, cara kerja blockchain, dan memulai trading pertama kamu.',
            type: 'pdf',
            file: 'assets/modules/modul-dasar-trading-crypto.pdf',
            category: 'Crypto',
            pages: 24
        },
        {
            id: 2,
            title: 'Analisa Teknikal untuk Pemula',
            desc: 'Memahami candlestick, support & resistance, trendline, dan indikator dasar.',
            type: 'pdf',
            file: 'assets/modules/modul-analisa-teknikal.pdf',
            category: 'Teknikal',
            pages: 32
        },
        {
            id: 3,
            title: 'Manajemen Risiko & Money Management',
            desc: 'Strategi mengelola risiko trading agar modal tetap aman dan profit konsisten.',
            type: 'pdf',
            file: 'assets/modules/modul-manajemen-risiko.pdf',
            category: 'Manajemen',
            pages: 18
        },
        {
            id: 4,
            title: 'Forex Trading: Panduan Lengkap',
            desc: 'Memahami pasar forex, pasangan mata uang, lot size, leverage, dan strategi entry.',
            type: 'pdf',
            file: 'assets/modules/modul-forex-trading.pdf',
            category: 'Forex',
            pages: 28
        },
        {
            id: 5,
            title: 'Strategi Supply & Demand',
            desc: 'Teknik trading supply & demand zone untuk menemukan entry point terbaik.',
            type: 'pdf',
            file: 'assets/modules/modul-supply-demand.pdf',
            category: 'Strategi',
            pages: 20
        },
        {
            id: 6,
            title: 'Psikologi Trading',
            desc: 'Mengatasi fear, greed, dan emosi dalam trading untuk menjadi trader yang disiplin.',
            type: 'pdf',
            file: 'assets/modules/modul-psikologi-trading.pdf',
            category: 'Psikologi',
            pages: 15
        }
    ];

    // ─── Auth Guard ─────────────────────────────────────
    const user = JSON.parse(localStorage.getItem('logged_in_user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Check payment status
    const isPaid = user.payment_status === 'paid';

    // ─── Populate User Info ────────────────────────────
    const initials = (user.name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

    // Sidebar avatar & info
    const sidebarAvatar = document.getElementById('sidebar-avatar');
    const sidebarName = document.getElementById('sidebar-user-name');
    const sidebarEmail = document.getElementById('sidebar-user-email');
    if (sidebarAvatar) sidebarAvatar.textContent = initials;
    if (sidebarName) sidebarName.textContent = user.name || 'Member';
    if (sidebarEmail) sidebarEmail.textContent = user.email || '';

    // Welcome title
    const welcomeNameEl = document.getElementById('welcome-name');
    if (welcomeNameEl) welcomeNameEl.textContent = user.name || 'Member';
    const welcomeNameUnpaid = document.getElementById('welcome-name-unpaid');
    if (welcomeNameUnpaid) welcomeNameUnpaid.textContent = user.name || 'Member';

    // Package info
    const packageName = user.package_type === 'vip' ? 'Premium' : user.package_type === 'basic' ? 'Basic' : 'Belum Aktif';
    const packageEl = document.getElementById('stat-package');
    if (packageEl) packageEl.textContent = packageName;

    const statusEl = document.getElementById('stat-status');
    if (statusEl) {
        statusEl.textContent = isPaid ? 'Aktif' : 'Belum Aktif';
        statusEl.className = `welcome-stat-value ${isPaid ? 'green' : ''}`;
    }

    // Topbar status
    const topbarStatus = document.getElementById('topbar-status');
    if (topbarStatus) {
        topbarStatus.className = `topbar-status ${isPaid ? 'active' : 'inactive'}`;
        topbarStatus.innerHTML = `<span class="topbar-status-dot"></span> ${isPaid ? 'Member Aktif' : 'Belum Aktif'}`;
    }

    // Profile section
    const profileAvatar = document.getElementById('profile-avatar');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileNameVal = document.getElementById('profile-name-value');
    const profileEmailVal = document.getElementById('profile-email-value');
    const profilePackageVal = document.getElementById('profile-package-value');
    const profileStatusBadge = document.getElementById('profile-status-badge');

    if (profileAvatar) profileAvatar.textContent = initials;
    if (profileName) profileName.textContent = user.name || 'Member';
    if (profileEmail) profileEmail.textContent = user.email || '';
    if (profileNameVal) profileNameVal.textContent = user.name || 'Member';
    if (profileEmailVal) profileEmailVal.textContent = user.email || '';
    if (profilePackageVal) profilePackageVal.textContent = packageName;
    if (profileStatusBadge) {
        profileStatusBadge.className = `profile-badge ${isPaid ? 'active' : 'inactive'}`;
        profileStatusBadge.textContent = isPaid ? '● Member Aktif' : '● Belum Aktif';
    }

    // ─── Sidebar Navigation ────────────────────────────
    const navItems = document.querySelectorAll('.sidebar-nav-item[data-section]');
    const sections = document.querySelectorAll('.dashboard-section');
    const topbarTitle = document.getElementById('topbar-title');

    const sectionTitles = {
        'home': 'Dashboard',
        'modules': 'Modul Edukasi',
        'profile': 'Profil Saya'
    };

    const switchSection = (sectionId) => {
        // Hide all sections
        sections.forEach(s => s.classList.remove('active'));
        // Show target
        const target = document.getElementById(`section-${sectionId}`);
        if (target) target.classList.add('active');
        // Update nav active
        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-section') === sectionId);
        });
        // Update topbar title
        if (topbarTitle) topbarTitle.textContent = sectionTitles[sectionId] || 'Dashboard';
        // Hide viewer if switching away from modules
        if (sectionId !== 'modules') {
            hideViewer();
        }
        // Close mobile sidebar
        closeMobileSidebar();
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            switchSection(sectionId);
        });
    });

    // ─── Show/Hide based on payment status ─────────────
    const paidContent = document.querySelectorAll('.paid-only');
    const unpaidContent = document.querySelectorAll('.unpaid-only');

    if (isPaid) {
        paidContent.forEach(el => el.style.display = '');
        unpaidContent.forEach(el => el.style.display = 'none');
    } else {
        paidContent.forEach(el => el.style.display = 'none');
        unpaidContent.forEach(el => el.style.display = '');
    }

    // ─── Render Modul Cards ────────────────────────────
    const modulGrid = document.getElementById('modul-grid');
    const modulCountEl = document.getElementById('modul-count');

    const renderModules = (filter = '') => {
        if (!modulGrid) return;
        const filtered = MODULES.filter(m =>
            m.title.toLowerCase().includes(filter.toLowerCase()) ||
            m.category.toLowerCase().includes(filter.toLowerCase())
        );

        if (modulCountEl) modulCountEl.textContent = `${filtered.length} modul tersedia`;

        modulGrid.innerHTML = filtered.map(m => `
            <div class="modul-card" data-id="${m.id}" onclick="openModul(${m.id})">
                <div class="modul-card-thumb ${m.type}-thumb">
                    <svg class="modul-thumb-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${m.type === 'pdf' ? '#F87171' : '#FBBF24'}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span class="modul-file-badge ${m.type}">${m.type.toUpperCase()}</span>
                </div>
                <div class="modul-card-body">
                    <div class="modul-card-title">${m.title}</div>
                    <div class="modul-card-desc">${m.desc}</div>
                    <div class="modul-card-meta">
                        <span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>
                            ${m.category}
                        </span>
                        <span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                            ${m.pages} halaman
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    };

    renderModules();

    // Search
    const modulSearch = document.getElementById('modul-search');
    if (modulSearch) {
        modulSearch.addEventListener('input', (e) => {
            renderModules(e.target.value);
        });
    }

    // ─── Open Modul Viewer ─────────────────────────────
    window.openModul = (id) => {
        const modul = MODULES.find(m => m.id === id);
        if (!modul) return;

        const viewerSection = document.getElementById('section-viewer');
        const modulSection = document.getElementById('section-modules');
        const viewerTitle = document.getElementById('viewer-title');
        const viewerContainer = document.getElementById('viewer-container');

        if (!viewerSection || !modulSection) return;

        modulSection.classList.remove('active');
        viewerSection.classList.add('active');

        if (viewerTitle) viewerTitle.textContent = modul.title;
        if (topbarTitle) topbarTitle.textContent = modul.title;

        if (viewerContainer) {
            // Try embedded viewer first
            viewerContainer.innerHTML = `
                <iframe src="${modul.file}" type="application/${modul.type === 'pdf' ? 'pdf' : 'vnd.ms-powerpoint'}"></iframe>
            `;

            // Fallback if iframe fails
            const iframe = viewerContainer.querySelector('iframe');
            if (iframe) {
                iframe.onerror = () => {
                    showViewerFallback(viewerContainer, modul);
                };
            }
        }
    };

    const showViewerFallback = (container, modul) => {
        container.innerHTML = `
            <div class="viewer-fallback">
                <div class="viewer-fallback-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00D084" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </div>
                <div class="viewer-fallback-title">Preview tidak tersedia</div>
                <div class="viewer-fallback-desc">Browser kamu tidak mendukung preview file ini. Kamu bisa download file-nya langsung.</div>
                <a href="${modul.file}" download class="btn-download">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download ${modul.type.toUpperCase()}
                </a>
            </div>
        `;
    };

    // ─── Hide Viewer (Back to Modul list) ──────────────
    const hideViewer = () => {
        const viewerSection = document.getElementById('section-viewer');
        if (viewerSection) viewerSection.classList.remove('active');
    };

    window.backToModules = () => {
        hideViewer();
        switchSection('modules');
    };

    // ─── Logout ────────────────────────────────────────
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('logged_in_user');
            window.location.href = 'index.html';
        });
    }

    // ─── Mobile Sidebar ────────────────────────────────
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const hamburgerDash = document.getElementById('hamburger-dash');

    const openMobileSidebar = () => {
        if (sidebar) sidebar.classList.add('open');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMobileSidebar = () => {
        if (sidebar) sidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (hamburgerDash) {
        hamburgerDash.addEventListener('click', openMobileSidebar);
    }
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMobileSidebar);
    }

    // ─── Check Payment Success from URL ────────────────
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
        // Update user payment status
        user.payment_status = 'paid';
        if (!user.package_type) {
            user.package_type = 'basic'; // default if not set
        }
        localStorage.setItem('logged_in_user', JSON.stringify(user));
        // Clean URL
        window.history.replaceState({}, document.title, 'dashboard.html');
        // Reload to reflect changes
        window.location.reload();
    }

    // ─── Initialize ────────────────────────────────────
    switchSection('home');
});
