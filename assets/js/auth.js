/* ============================================
   RUANG TRADER — Auth JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Password Visibility Toggle ─────────────────────
    document.querySelectorAll('.password-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('.form-input');
            const eyeOpen = btn.querySelector('.eye-open');
            const eyeClosed = btn.querySelector('.eye-closed');

            if (input.type === 'password') {
                input.type = 'text';
                eyeOpen.style.display = 'none';
                eyeClosed.style.display = 'block';
            } else {
                input.type = 'password';
                eyeOpen.style.display = 'block';
                eyeClosed.style.display = 'none';
            }
        });
    });

    // ─── Form Validation Helpers ────────────────────────
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const setError = (group, message) => {
        group.classList.add('error');
        group.classList.remove('success');
        const errorEl = group.querySelector('.form-error');
        if (errorEl) errorEl.textContent = message;
    };

    const setSuccess = (group) => {
        group.classList.remove('error');
        group.classList.add('success');
    };

    const clearValidation = (group) => {
        group.classList.remove('error', 'success');
    };

    // ─── Toast Notification ─────────────────────────────
    window.showToast = (message, type = 'success') => {
        // Remove existing toast
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${type === 'success' ? '#22C55E' : '#EF4444'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                ${type === 'success'
                    ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
                    : '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>'
                }
            </svg>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    };

    // ─── Login Form ─────────────────────────────────────
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const emailGroup = document.getElementById('loginEmailGroup');
            const passwordGroup = document.getElementById('loginPasswordGroup');
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            const submitBtn = loginForm.querySelector('.btn-auth');

            // Validate email
            if (!email) {
                setError(emailGroup, 'Email wajib diisi');
                isValid = false;
            } else if (!validateEmail(email)) {
                setError(emailGroup, 'Format email tidak valid');
                isValid = false;
            } else {
                setSuccess(emailGroup);
            }

            // Validate password
            if (!password) {
                setError(passwordGroup, 'Password wajib diisi');
                isValid = false;
            } else if (!validatePassword(password)) {
                setError(passwordGroup, 'Password minimal 6 karakter');
                isValid = false;
            } else {
                setSuccess(passwordGroup);
            }

            if (isValid) {
                submitBtn.classList.add('loading');

                // Simulate login
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    showToast('Login berhasil! Mengalihkan...', 'success');

                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                }, 1800);
            }
        });

        // Clear errors on input
        document.querySelectorAll('#loginForm .form-input').forEach(input => {
            input.addEventListener('input', () => {
                clearValidation(input.closest('.form-group'));
            });
        });
    }

    // ─── Register Form ──────────────────────────────────
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        // Password strength meter
        const passwordInput = document.getElementById('registerPassword');
        const strengthSegments = document.querySelectorAll('.strength-segment');
        const strengthText = document.querySelector('.strength-text');

        if (passwordInput && strengthText) {
            passwordInput.addEventListener('input', () => {
                const val = passwordInput.value;
                let strength = 0;

                if (val.length >= 6) strength++;
                if (val.length >= 10) strength++;
                if (/[A-Z]/.test(val) && /[a-z]/.test(val)) strength++;
                if (/[0-9]/.test(val)) strength++;
                if (/[^A-Za-z0-9]/.test(val)) strength++;

                let level = 'weak';
                let text = 'Lemah';
                let active = 1;

                if (strength >= 4) {
                    level = 'strong';
                    text = 'Kuat';
                    active = 4;
                } else if (strength >= 2) {
                    level = 'medium';
                    text = 'Sedang';
                    active = 2;
                }

                strengthSegments.forEach((seg, i) => {
                    seg.classList.remove('active', 'weak', 'medium', 'strong');
                    if (i < active && val.length > 0) {
                        seg.classList.add('active', level);
                    }
                });

                strengthText.className = `strength-text ${val.length > 0 ? level : ''}`;
                strengthText.textContent = val.length > 0 ? `Password ${text}` : '';
            });
        }

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const nameGroup = document.getElementById('registerNameGroup');
            const emailGroup = document.getElementById('registerEmailGroup');
            const passwordGroup = document.getElementById('registerPasswordGroup');
            const confirmGroup = document.getElementById('registerConfirmGroup');
            const agreeGroup = document.getElementById('registerAgreeGroup');

            const name = document.getElementById('registerName').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value;
            const confirm = document.getElementById('registerConfirm').value;
            const agree = document.getElementById('registerAgree').checked;
            const submitBtn = registerForm.querySelector('.btn-auth');

            // Validate name
            if (!name) {
                setError(nameGroup, 'Nama lengkap wajib diisi');
                isValid = false;
            } else if (name.length < 3) {
                setError(nameGroup, 'Nama minimal 3 karakter');
                isValid = false;
            } else {
                setSuccess(nameGroup);
            }

            // Validate email
            if (!email) {
                setError(emailGroup, 'Email wajib diisi');
                isValid = false;
            } else if (!validateEmail(email)) {
                setError(emailGroup, 'Format email tidak valid');
                isValid = false;
            } else {
                setSuccess(emailGroup);
            }

            // Validate password
            if (!password) {
                setError(passwordGroup, 'Password wajib diisi');
                isValid = false;
            } else if (!validatePassword(password)) {
                setError(passwordGroup, 'Password minimal 6 karakter');
                isValid = false;
            } else {
                setSuccess(passwordGroup);
            }

            // Validate confirm password
            if (!confirm) {
                setError(confirmGroup, 'Konfirmasi password wajib diisi');
                isValid = false;
            } else if (confirm !== password) {
                setError(confirmGroup, 'Password tidak cocok');
                isValid = false;
            } else {
                setSuccess(confirmGroup);
            }

            // Validate agreement
            if (!agree) {
                if (agreeGroup) agreeGroup.classList.add('error');
                showToast('Kamu harus menyetujui syarat & ketentuan', 'error');
                isValid = false;
            }

            if (isValid) {
                submitBtn.classList.add('loading');

                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    showToast('Registrasi berhasil! Silakan login.', 'success');

                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                }, 2000);
            }
        });

        // Clear errors on input
        document.querySelectorAll('#registerForm .form-input').forEach(input => {
            input.addEventListener('input', () => {
                clearValidation(input.closest('.form-group'));
            });
        });
    }

    // ─── Forgot Password Form ───────────────────────────
    const forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
        forgotForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailGroup = document.getElementById('forgotEmailGroup');
            const email = document.getElementById('forgotEmail').value.trim();
            const submitBtn = forgotForm.querySelector('.btn-auth');

            if (!email) {
                setError(emailGroup, 'Email wajib diisi');
                return;
            }

            if (!validateEmail(email)) {
                setError(emailGroup, 'Format email tidak valid');
                return;
            }

            setSuccess(emailGroup);
            submitBtn.classList.add('loading');

            setTimeout(() => {
                submitBtn.classList.remove('loading');

                // Show success message, hide form
                forgotForm.style.display = 'none';
                const successMsg = document.getElementById('forgotSuccess');
                if (successMsg) {
                    successMsg.classList.add('show');
                    const emailSpan = successMsg.querySelector('.email-highlight');
                    if (emailSpan) emailSpan.textContent = email;
                }
            }, 1800);
        });

        document.querySelectorAll('#forgotForm .form-input').forEach(input => {
            input.addEventListener('input', () => {
                clearValidation(input.closest('.form-group'));
            });
        });
    }

    // ─── Enter key submit ───────────────────────────────
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const form = input.closest('form');
                if (form) form.dispatchEvent(new Event('submit'));
            }
        });
    });
});
