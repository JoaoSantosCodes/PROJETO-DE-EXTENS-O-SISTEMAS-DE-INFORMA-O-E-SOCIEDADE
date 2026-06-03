/* ==========================================================================
   THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.className = 'fa-solid fa-sun';
} else {
    document.body.classList.remove('light-theme');
    themeIcon.className = 'fa-solid fa-moon';
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    
    // Update storage & icon
    if (isLight) {
        localStorage.setItem('theme', 'light');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        localStorage.setItem('theme', 'dark');
        themeIcon.className = 'fa-solid fa-moon';
    }
});

/* ==========================================================================
   MOBILE DRAWER NAVIGATION
   ========================================================================== */
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');
const mobileDrawerClose = document.getElementById('mobile-drawer-close');

function openDrawer() {
    mobileDrawer.classList.add('active');
}

function closeDrawer() {
    mobileDrawer.classList.remove('active');
}

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openDrawer);
}
if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeDrawer);
}

// Close drawer if clicking outside the drawer content
document.addEventListener('click', (e) => {
    if (mobileDrawer.classList.contains('active') && 
        !mobileDrawer.contains(e.target) && 
        !mobileMenuToggle.contains(e.target)) {
        closeDrawer();
    }
});

/* ==========================================================================
   RESUME BUILDER CONTROLLER
   ========================================================================== */
const cvForm = document.getElementById('cv-form');
const emptyPreviewMsg = document.getElementById('empty-preview-msg');
const cvPreviewContent = document.getElementById('cv-preview-content');
const btnPrintCv = document.getElementById('btn-print-cv');

// Form inputs
const inputNome = document.getElementById('cv-nome');
const inputCargo = document.getElementById('cv-cargo');
const inputEmail = document.getElementById('cv-email');
const inputTelefone = document.getElementById('cv-telefone');
const inputEndereco = document.getElementById('cv-endereco');
const inputResumo = document.getElementById('cv-resumo');
const inputCurso = document.getElementById('cv-curso');
const inputInstituicao = document.getElementById('cv-instituicao');
const inputAno = document.getElementById('cv-ano');
const inputExpCargo = document.getElementById('cv-exp-cargo');
const inputExpEmpresa = document.getElementById('cv-exp-empresa');
const inputExpPeriodo = document.getElementById('cv-exp-periodo');
const inputExpDesc = document.getElementById('cv-exp-desc');
const inputHabilidades = document.getElementById('cv-habilidades');

// State tracking
let resumeGeneratedData = null;

cvForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Extract values
    const nomeVal = inputNome.value.trim();
    const cargoVal = inputCargo.value.trim();
    const emailVal = inputEmail.value.trim();
    const telVal = inputTelefone.value.trim();
    const endVal = inputEndereco.value.trim();
    const resumoVal = inputResumo.value.trim();
    const cursoVal = inputCurso.value.trim();
    const instVal = inputInstituicao.value.trim();
    const anoVal = inputAno.value.trim();
    const expCargoVal = inputExpCargo.value.trim();
    const expEmpVal = inputExpEmpresa.value.trim();
    const expPerVal = inputExpPeriodo.value.trim();
    const expDescVal = inputExpDesc.value.trim();
    const habVal = inputHabilidades.value.trim();
    
    // Inject values into A4 layout
    document.getElementById('prev-nome').textContent = nomeVal;
    document.getElementById('prev-cargo').textContent = cargoVal;
    document.getElementById('prev-email').innerHTML = `<i class="fa-solid fa-envelope"></i> ${emailVal}`;
    document.getElementById('prev-telefone').innerHTML = `<i class="fa-solid fa-phone"></i> ${telVal}`;
    document.getElementById('prev-endereco').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${endVal}`;
    document.getElementById('prev-resumo').textContent = resumoVal;
    document.getElementById('prev-curso').textContent = cursoVal;
    document.getElementById('prev-instituicao').textContent = instVal;
    document.getElementById('prev-ano').textContent = anoVal;
    
    // Handle Work Experience (optional fields check)
    const prevSectionExp = document.getElementById('prev-section-exp');
    if (expCargoVal || expEmpVal) {
        prevSectionExp.classList.remove('hidden');
        document.getElementById('prev-exp-cargo').textContent = expCargoVal || 'Cargo Ocupado';
        document.getElementById('prev-exp-empresa').textContent = expEmpVal || 'Empresa';
        document.getElementById('prev-exp-periodo').textContent = expPerVal || 'Período';
        document.getElementById('prev-exp-desc').textContent = expDescVal || '';
    } else {
        prevSectionExp.classList.add('hidden');
    }
    
    // Handle Skills (split by comma and create badges)
    const skillsContainer = document.getElementById('prev-habilidades');
    skillsContainer.innerHTML = ''; // clear previous
    if (habVal) {
        const skillsArray = habVal.split(',').map(s => s.trim()).filter(s => s.length > 0);
        skillsArray.forEach(skill => {
            const span = document.createElement('span');
            span.className = 'cv-skills-badge';
            span.textContent = skill;
            skillsContainer.appendChild(span);
        });
    }
    
    // Save State
    resumeGeneratedData = {
        nome: nomeVal,
        cargo: cargoVal
    };
    
    // Switch View
    emptyPreviewMsg.classList.add('hidden');
    cvPreviewContent.classList.remove('hidden');
    btnPrintCv.removeAttribute('disabled');
    
    // Smooth scroll down to preview on mobile devices
    if (window.innerWidth <= 1024) {
        document.querySelector('.preview-outer-container').scrollIntoView({ behavior: 'smooth' });
    }
});

// Print trigger
btnPrintCv.addEventListener('click', () => {
    if (resumeGeneratedData) {
        window.print();
    }
});

/* ==========================================================================
   JOBS BOARD CONTROLLER
   ========================================================================== */
const searchInput = document.getElementById('job-search');
const filterBtns = document.querySelectorAll('.filter-btn');
const jobCards = document.querySelectorAll('.job-card');

// Filter Category Function
function filterJobs() {
    const searchText = searchInput.value.toLowerCase().trim();
    const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
    
    jobCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        const cardCategory = card.getAttribute('data-category');
        
        const matchesSearch = cardText.includes(searchText);
        const matchesCategory = (activeCategory === 'todas' || cardCategory === activeCategory);
        
        if (matchesSearch && matchesCategory) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Bind search input events
if (searchInput) {
    searchInput.addEventListener('input', filterJobs);
}

// Bind category buttons events
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle active status
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Run filtering
        filterJobs();
    });
});

/* ==========================================================================
   APPLICATION MODAL DIALOG
   ========================================================================== */
const applyModal = document.getElementById('apply-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalVaga = document.getElementById('modal-vaga');
const modalEmpresa = document.getElementById('modal-empresa');
const modalContentArea = document.getElementById('modal-content-area');

function openApplyModal(vaga, empresa) {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Por favor, faça login ou cadastre-se para se candidatar às vagas!");
        openAuthModal();
        return;
    }

    // Check if the user created a CV first to guide them (social literacy concept)
    if (!resumeGeneratedData) {
        alert("Por favor, preencha o formulário e crie seu currículo na seção 'Criar Currículo' antes de se candidatar!");
        document.getElementById('gerador-curriculo').scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    // Inject details
    modalVaga.textContent = vaga;
    modalEmpresa.textContent = empresa;
    
    // Personalize modal text
    const titleNode = modalContentArea.querySelector('h2');
    const descNode = modalContentArea.querySelector('p');
    
    titleNode.innerHTML = `Parabéns, ${resumeGeneratedData.nome}!`;
    descNode.innerHTML = `Seu currículo de <strong>${resumeGeneratedData.cargo}</strong> foi enviado com sucesso para a vaga de <strong>${vaga}</strong> na empresa <strong>${empresa}</strong>.`;
    
    // Open modal
    applyModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // lock scrolling
}

function closeApplyModal() {
    applyModal.classList.add('hidden');
    document.body.style.overflow = ''; // unlock scrolling
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeApplyModal);
}

// Close if clicking outside the modal content
if (applyModal) {
    applyModal.addEventListener('click', (e) => {
        if (e.target === applyModal) {
            closeApplyModal();
        }
    });
}

/* ==========================================================================
   AUTHENTICATION LOGIC (API & SESSIONS)
   ========================================================================== */
const authModal = document.getElementById('auth-modal');
const btnLoginTrigger = document.getElementById('btn-login-trigger');
const userSessionWrapper = document.getElementById('user-session-wrapper');
const userNameDisplay = document.getElementById('user-name-display');
const btnLogoutTrigger = document.getElementById('btn-logout-trigger');
const authModalCloseBtn = document.getElementById('auth-modal-close-btn');

const tabLoginBtn = document.getElementById('tab-login-btn');
const tabRegisterBtn = document.getElementById('tab-register-btn');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');

function openAuthModal() {
    authModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    switchTab('login');
}

function closeAuthModal() {
    authModal.classList.add('hidden');
    document.body.style.overflow = '';
    // Clear forms and errors
    loginForm.reset();
    registerForm.reset();
    loginError.classList.add('hidden');
    registerError.classList.add('hidden');
}

function switchTab(tab) {
    if (tab === 'login') {
        tabLoginBtn.classList.add('active');
        tabRegisterBtn.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        tabRegisterBtn.classList.add('active');
        tabLoginBtn.classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    }
}

// Bind auth UI events
if (btnLoginTrigger) btnLoginTrigger.addEventListener('click', openAuthModal);
if (authModalCloseBtn) authModalCloseBtn.addEventListener('click', closeAuthModal);
if (tabLoginBtn) tabLoginBtn.addEventListener('click', () => switchTab('login'));
if (tabRegisterBtn) tabRegisterBtn.addEventListener('click', () => switchTab('register'));

// Close if clicking outside the auth modal
if (authModal) {
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            closeAuthModal();
        }
    });
}

// Update UI based on user authentication state
function checkSession() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
        try {
            const user = JSON.parse(userStr);
            userNameDisplay.innerHTML = `<i class="fa-solid fa-user"></i> Olá, ${user.nome.split(' ')[0]}`;
            btnLoginTrigger.classList.add('hidden');
            userSessionWrapper.classList.remove('hidden');
        } catch (e) {
            clearSession();
        }
    } else {
        btnLoginTrigger.classList.remove('hidden');
        userSessionWrapper.classList.add('hidden');
    }
}

function clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    checkSession();
}

if (btnLogoutTrigger) {
    btnLogoutTrigger.addEventListener('click', () => {
        clearSession();
        // Clear generated CV state on logout
        resumeGeneratedData = null;
        btnPrintCv.setAttribute('disabled', 'true');
        emptyPreviewMsg.classList.remove('hidden');
        cvPreviewContent.classList.add('hidden');
        cvForm.reset();
    });
}

// 1. Submit Registration Form
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        registerError.classList.add('hidden');

        const nome = document.getElementById('reg-nome').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const senha = document.getElementById('reg-senha').value;

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao realizar cadastro.');
            }

            // Save session
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Auto-fill CV generator name and email
            inputNome.value = data.user.nome;
            inputEmail.value = data.user.email;

            // Success feedback
            alert(data.message || 'Cadastro realizado!');
            closeAuthModal();
            checkSession();

        } catch (err) {
            registerError.textContent = err.message;
            registerError.classList.remove('hidden');
        }
    });
}

// 2. Submit Login Form
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginError.classList.add('hidden');

        const email = document.getElementById('login-email').value.trim();
        const senha = document.getElementById('login-senha').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao realizar login.');
            }

            // Save session
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Auto-fill CV generator name and email
            inputNome.value = data.user.nome;
            inputEmail.value = data.user.email;

            // Success feedback
            alert(data.message || 'Login realizado!');
            closeAuthModal();
            checkSession();

        } catch (err) {
            loginError.textContent = err.message;
            loginError.classList.remove('hidden');
        }
    });
}

// Run session check on page load
document.addEventListener('DOMContentLoaded', () => {
    checkSession();
    
    // Auto-fill CV if user is already logged in
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            inputNome.value = user.nome;
            inputEmail.value = user.email;
        } catch (e) {}
    }
});
