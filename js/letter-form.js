// ─── LETTER FORM EXPERIENCE - STEP BY STEP ──────────────────────

// Elements
const envelope = document.getElementById('envelope');
const envelopeBack = document.getElementById('envelopeBack');
const letter = document.getElementById('letter');
const letterProgress = document.getElementById('letterProgress');
const currentStepNum = document.getElementById('currentStepNum');
const totalStepsNum = document.getElementById('totalStepsNum');
const mailbox = document.getElementById('mailbox');
const letterSuccess = document.getElementById('letterSuccess');
const currentDateEl = document.getElementById('currentDate');

// Navigation buttons
const prevStepBtn = document.getElementById('prevStepBtn');
const nextStepBtn = document.getElementById('nextStepBtn');
const finalSendBtn = document.getElementById('finalSendBtn');

// Steps
const letterSteps = document.querySelectorAll('.letter__step');
const totalSteps = letterSteps.length;

// Current step
let currentStep = 1;

// Form data
const formData = {
  empresa: '',
  industria: '',
  tamaño: '',
  proceso: '',
  situacion: '',
  problema: '',
  presupuesto: '',
  email: '',
  telefono: '',
  nombre: ''
};

// Step field mapping
const stepFields = {
  1: ['empresa', 'industria'],
  2: ['tamaño'],
  3: [], // Will be validated dynamically based on toggle
  4: ['situacion'],
  5: ['problema'],
  6: ['presupuesto']
};

// Initialize
function init() {
  setCurrentDate();
  setupEnvelopeInteraction();
  setupInputListeners();
  setupNavigation();
  setupFinalForm();
  updateProgress();
  updateNavigationButtons();
}

// Set current date
function setCurrentDate() {
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = today.toLocaleDateString('es-ES', options);
  if (currentDateEl) {
    currentDateEl.textContent = dateString;
  }
}

// Setup envelope interaction
function setupEnvelopeInteraction() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !envelope.classList.contains('opening')) {
        setTimeout(() => {
          openEnvelope();
        }, 500);
      }
    });
  }, { threshold: 0.3 });

  if (envelope) {
    observer.observe(envelope);
  }

  envelope?.addEventListener('click', openEnvelope);
}

// Open envelope and show letter
function openEnvelope() {
  if (envelope.classList.contains('opening')) return;
  
  envelope.classList.add('opening');
  
  // Wait for envelope animation to complete before showing letter
  setTimeout(() => {
    letter.classList.add('visible');
    setTimeout(() => {
      letterProgress.classList.add('visible');
    }, 800);
  }, 1500);
}

// Setup input listeners
function setupInputListeners() {
  const inputs = document.querySelectorAll('.letter__input, .letter__select, .letter__textarea');
  
  inputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const field = e.target.dataset.field;
      formData[field] = e.target.value;
      
      if (e.target.value) {
        e.target.classList.add('filled');
      } else {
        e.target.classList.remove('filled');
      }
      
      updateNavigationButtons();
    });

    if (input.classList.contains('letter__input') || input.classList.contains('letter__textarea')) {
      input.addEventListener('focus', (e) => {
        if (e.target.parentElement && e.target.parentElement.classList.contains('letter__input-wrapper')) {
          e.target.parentElement.style.borderBottomColor = 'var(--color-primary)';
        }
      });

      input.addEventListener('blur', (e) => {
        if (!e.target.value && e.target.parentElement && e.target.parentElement.classList.contains('letter__input-wrapper')) {
          e.target.parentElement.style.borderBottomColor = '';
        }
      });
    }
  });
  
  // Setup toggle for step 3
  const evaluateToggle = document.getElementById('evaluateProcesses');
  const specificProcess = document.getElementById('specificProcess');
  const evaluateOption = document.getElementById('evaluateOption');
  
  if (evaluateToggle) {
    evaluateToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        specificProcess.classList.add('hidden');
        evaluateOption.classList.remove('hidden');
        formData.proceso = 'Evaluación de procesos solicitada';
      } else {
        specificProcess.classList.remove('hidden');
        evaluateOption.classList.add('hidden');
        const processInput = document.getElementById('process');
        formData.proceso = processInput ? processInput.value : '';
      }
      updateNavigationButtons();
    });
  }
}

// Setup navigation
function setupNavigation() {
  prevStepBtn?.addEventListener('click', () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  });

  nextStepBtn?.addEventListener('click', () => {
    if (currentStep < totalSteps) {
      goToStep(currentStep + 1);
    } else {
      // Last step - close letter and show envelope back
      closeLetter();
    }
  });
}

// Go to specific step
function goToStep(step) {
  const currentStepEl = document.querySelector(`.letter__step[data-step="${currentStep}"]`);
  const nextStepEl = document.querySelector(`.letter__step[data-step="${step}"]`);
  
  if (!nextStepEl) return;
  
  // Exit current step
  currentStepEl.classList.add('exiting');
  currentStepEl.classList.remove('active');
  
  setTimeout(() => {
    currentStepEl.classList.remove('exiting');
    
    // Enter next step
    nextStepEl.classList.add('active');
    currentStep = step;
    
    updateProgress();
    updateNavigationButtons();
  }, 300);
}

// Update progress indicator
function updateProgress() {
  if (currentStepNum) {
    currentStepNum.textContent = currentStep;
  }
  if (totalStepsNum) {
    totalStepsNum.textContent = totalSteps;
  }
}

// Update navigation buttons
function updateNavigationButtons() {
  // Previous button
  if (prevStepBtn) {
    prevStepBtn.disabled = currentStep === 1;
  }
  
  // Next button
  if (nextStepBtn) {
    let isStepComplete = false;
    
    if (currentStep === 3) {
      // Special validation for step 3 (toggle)
      const evaluateToggle = document.getElementById('evaluateProcesses');
      if (evaluateToggle && evaluateToggle.checked) {
        isStepComplete = true;
      } else {
        isStepComplete = formData.proceso && formData.proceso.trim() !== '';
      }
    } else {
      const currentStepFields = stepFields[currentStep];
      isStepComplete = currentStepFields.every(field => formData[field] && formData[field].trim() !== '');
    }
    
    nextStepBtn.disabled = !isStepComplete;
    
    // Change text on last step
    if (currentStep === totalSteps) {
      nextStepBtn.textContent = 'Cerrar carta';
    } else {
      nextStepBtn.textContent = 'Siguiente';
    }
  }
}

// Close letter and show envelope back
function closeLetter() {
  // Hide progress
  letterProgress.classList.remove('visible');
  
  // Close letter with animation
  letter.classList.add('closing');
  
  setTimeout(() => {
    // Completely hide letter
    letter.style.display = 'none';
    letter.classList.remove('visible');
    letter.classList.remove('closing');
    
    // Close and flip envelope
    envelope.classList.remove('opening');
    envelope.classList.add('closing');
    
    setTimeout(() => {
      // Show envelope back after flip completes
      envelopeBack.classList.add('visible');
    }, 1600);
  }, 600);
}

// Setup final form (envelope back)
function setupFinalForm() {
  const finalInputs = document.querySelectorAll('#finalName, #finalEmail, #finalPhone');
  
  finalInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const field = e.target.dataset.field;
      formData[field] = e.target.value;
      
      checkFinalFormCompletion();
    });
  });
}

// Check if final form is complete
function checkFinalFormCompletion() {
  const requiredFinalFields = ['nombre', 'email'];
  const isComplete = requiredFinalFields.every(field => formData[field] && formData[field].trim() !== '');
  
  if (finalSendBtn) {
    finalSendBtn.disabled = !isComplete;
  }
}

// Setup final send button
finalSendBtn?.addEventListener('click', async (e) => {
  e.preventDefault();
  
  if (finalSendBtn.disabled) return;
  
  finalSendBtn.disabled = true;
  finalSendBtn.textContent = 'Enviando...';
  
  try {
    await sendEmail();
    
    setTimeout(() => {
      animateSendSequence();
    }, 500);
    
  } catch (error) {
    console.error('Error sending letter:', error);
    alert('Hubo un error al enviar la carta. Por favor intenta nuevamente.');
    finalSendBtn.disabled = false;
    finalSendBtn.textContent = 'Enviar carta';
  }
});

// Send email function
async function sendEmail() {
  const formSubmitURL = 'https://formsubmit.co/caltriasupport@gmail.com';
  
  const formDataToSend = new FormData();
  formDataToSend.append('_subject', `Nueva carta de ${formData.empresa} - Caltria`);
  formDataToSend.append('_template', 'table');
  formDataToSend.append('_captcha', 'false');
  formDataToSend.append('Empresa', formData.empresa);
  formDataToSend.append('Industria', formData.industria);
  formDataToSend.append('Tamaño', formData.tamaño);
  formDataToSend.append('Proceso', formData.proceso);
  formDataToSend.append('Situación', formData.situacion);
  formDataToSend.append('Problema', formData.problema);
  formDataToSend.append('Presupuesto', formData.presupuesto);
  formDataToSend.append('Email', formData.email);
  formDataToSend.append('Teléfono', formData.telefono);
  formDataToSend.append('Nombre', formData.nombre);
  
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

// Animate send sequence
function animateSendSequence() {
  // 1. Hide envelope back
  envelopeBack.classList.remove('visible');
  
  // 2. Envelope lifts and moves away
  setTimeout(() => {
    envelope.style.transition = 'all 2s cubic-bezier(0.16, 1, 0.3, 1)';
    envelope.style.transform = 'translateY(-100vh) scale(0.5) rotateZ(-10deg)';
    envelope.style.opacity = '0';
    
    // 3. Show success message
    setTimeout(() => {
      envelope.style.display = 'none';
      letterSuccess.classList.add('visible');
    }, 2000);
  }, 400);
}

// Initialize on load
if (envelope && letter) {
  init();
}

console.log('%c✉️ Letter Form Ready', 'color: #ff006e; font-size: 14px; font-weight: bold;');
