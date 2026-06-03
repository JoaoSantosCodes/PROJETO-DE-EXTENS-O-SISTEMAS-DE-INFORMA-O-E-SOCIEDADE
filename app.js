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
