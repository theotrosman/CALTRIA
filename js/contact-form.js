// ─── Multi-Step Contact Form ────────────────────────────────────

const form = document.getElementById('contactForm');
const formSteps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.form-progress__step');
const progressLine = document.querySelector('.form-progress__line');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.querySelector('.form-success');

let currentStep = 0;
const totalSteps = formSteps.length;

// Form data storage
const formData = {
  companyName: '',
  industry: '',
  companySize: '',
  services: [],
  goals: '',
  timeline: '',
  budget: '',
  name: '',
  email: '',
  phone: ''
};

// Initialize
function init() {
  showStep(0);
  updateProgress();
  attachEventListeners();
}

// Show specific step
function showStep(step) {
  formSteps.forEach((s, index) => {
    s.classList.toggle('active', index === step);
  });

  progressSteps.forEach((s, index) => {
    s.classList.toggle('active', index === step);
    s.classList.toggle('completed', index < step);
  });

  // Update buttons
  prevBtn.style.display = step === 0 ? 'none' : 'flex';
  nextBtn.style.display = step === totalSteps - 1 ? 'none' : 'flex';
  submitBtn.style.display = step === totalSteps - 1 ? 'flex' : 'none';

  // Update progress line
  const progressPercent = (step / (totalSteps - 1)) * 100;
  progressLine.style.width = `${progressPercent}%`;

  currentStep = step;
}

// Validate current step
function validateStep(step) {
  const currentStepEl = formSteps[step];
  const requiredFields = currentStepEl.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (field.type === 'checkbox') {
      const checkboxGroup = currentStepEl.querySelectorAll(`input[name="${field.name}"]`);
      const isChecked = Array.from(checkboxGroup).some(cb => cb.checked);
      if (!isChecked) isValid = false;
    } else if (!field.value.trim()) {
      isValid = false;
      field.style.borderColor = 'var(--color-primary)';
      setTimeout(() => {
        field.style.borderColor = '';
      }, 2000);
    }
  });

  return isValid;
}

// Next step
function nextStep() {
  if (validateStep(currentStep)) {
    saveStepData(currentStep);
    if (currentStep < totalSteps - 1) {
      showStep(currentStep + 1);
    }
  } else {
    // Shake animation for invalid form
    const currentStepEl = formSteps[currentStep];
    currentStepEl.style.animation = 'none';
    setTimeout(() => {
      currentStepEl.style.animation = 'shake 0.5s';
    }, 10);
  }
}

// Previous step
function prevStep() {
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
}

// Save step data
function saveStepData(step) {
  const currentStepEl = formSteps[step];
  
  switch(step) {
    case 0: // Company info
      formData.companyName = currentStepEl.querySelector('[name="companyName"]').value;
      formData.industry = currentStepEl.querySelector('[name="industry"]').value;
      formData.companySize = currentStepEl.querySelector('[name="companySize"]').value;
      break;
    
    case 1: // Services
      const serviceCheckboxes = currentStepEl.querySelectorAll('[name="services"]:checked');
      formData.services = Array.from(serviceCheckboxes).map(cb => cb.value);
      break;
    
    case 2: // Goals & automation
      formData.goals = currentStepEl.querySelector('[name="goals"]').value;
      formData.timeline = currentStepEl.querySelector('[name="timeline"]').value;
      break;
    
    case 3: // Budget
      formData.budget = currentStepEl.querySelector('[name="budget"]').value;
      break;
    
    case 4: // Contact info
      formData.name = currentStepEl.querySelector('[name="name"]').value;
      formData.email = currentStepEl.querySelector('[name="email"]').value;
      formData.phone = currentStepEl.querySelector('[name="phone"]').value;
      break;
  }
}

// Submit form
async function submitForm(e) {
  e.preventDefault();
  
  if (!validateStep(currentStep)) {
    return;
  }
  
  saveStepData(currentStep);
  
  // Show loading state
  submitBtn.classList.add('form-btn--loading');
  submitBtn.disabled = true;
  
  try {
    // Send email via FormSubmit or EmailJS
    const response = await sendEmail(formData);
    
    // Show success
    setTimeout(() => {
      formSteps[currentStep].classList.remove('active');
      formSuccess.classList.add('active');
      submitBtn.classList.remove('form-btn--loading');
    }, 1500);
    
  } catch (error) {
    console.error('Error sending form:', error);
    alert('Hubo un error al enviar el formulario. Por favor intenta nuevamente.');
    submitBtn.classList.remove('form-btn--loading');
    submitBtn.disabled = false;
  }
}

// Send email function
async function sendEmail(data) {
  // Using FormSubmit.co (free service)
  const formSubmitURL = 'https://formsubmit.co/caltriasupport@gmail.com';
  
  const emailBody = `
    <h2>Nuevo contacto desde Caltria</h2>
    
    <h3>Información de la Empresa</h3>
    <p><strong>Empresa:</strong> ${data.companyName}</p>
    <p><strong>Industria:</strong> ${data.industry}</p>
    <p><strong>Tamaño:</strong> ${data.companySize}</p>
    
    <h3>Servicios de Interés</h3>
    <p>${data.services.join(', ')}</p>
    
    <h3>Objetivos y Automatización</h3>
    <p>${data.goals}</p>
    <p><strong>Timeline:</strong> ${data.timeline}</p>
    
    <h3>Presupuesto</h3>
    <p>${data.budget}</p>
    
    <h3>Información de Contacto</h3>
    <p><strong>Nombre:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Teléfono:</strong> ${data.phone}</p>
  `;
  
  const formDataToSend = new FormData();
  formDataToSend.append('_subject', `Nuevo contacto de ${data.companyName} - Caltria`);
  formDataToSend.append('_template', 'table');
  formDataToSend.append('_captcha', 'false');
  formDataToSend.append('Empresa', data.companyName);
  formDataToSend.append('Industria', data.industry);
  formDataToSend.append('Tamaño', data.companySize);
  formDataToSend.append('Servicios', data.services.join(', '));
  formDataToSend.append('Objetivos', data.goals);
  formDataToSend.append('Timeline', data.timeline);
  formDataToSend.append('Presupuesto', data.budget);
  formDataToSend.append('Nombre', data.name);
  formDataToSend.append('Email', data.email);
  formDataToSend.append('Teléfono', data.phone);
  
  const response = await fetch(formSubmitURL, {
    method: 'POST',
    body: formDataToSend,
    headers: {
      'Accept': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error('Error sending email');
  }
  
  return response;
}

// Update progress
function updateProgress() {
  const progressPercent = (currentStep / (totalSteps - 1)) * 100;
  progressLine.style.width = `${progressPercent}%`;
}

// Attach event listeners
function attachEventListeners() {
  nextBtn.addEventListener('click', nextStep);
  prevBtn.addEventListener('click', prevStep);
  form.addEventListener('submit', submitForm);
  
  // Enter key to advance
  form.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      if (currentStep < totalSteps - 1) {
        nextStep();
      }
    }
  });
}

// Shake animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`;
document.head.appendChild(style);

// Initialize on load
if (form) {
  init();
}

console.log('%c📧 Contact Form Ready', 'color: #ff006e; font-size: 14px; font-weight: bold;');
