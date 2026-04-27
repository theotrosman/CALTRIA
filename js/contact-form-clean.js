// ─── Multi-Step Contact Form (Clean) ────────────────────────────

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
  
  // Scroll to top of form
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Validate current step
function validateStep(step) {
  const currentStepEl = formSteps[step];
  const requiredFields = currentStepEl.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
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

// Update progress
function updateProgress() {
  const progressPercent = (currentStep / (totalSteps - 1)) * 100;
  progressLine.style.width = `${progressPercent}%`;
}

// Attach event listeners
function attachEventListeners() {
  nextBtn.addEventListener('click', nextStep);
  prevBtn.addEventListener('click', prevStep);
  
  // Enter key to advance (except in textarea)
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
  
  // Check for success in URL (after FormSubmit redirect)
  if (window.location.hash === '#success') {
    formSteps.forEach(step => step.classList.remove('active'));
    formSuccess.classList.add('active');
    document.querySelector('.form-progress').style.display = 'none';
    document.querySelector('.form-actions').style.display = 'none';
  }
}

console.log('Contact Form Ready');
